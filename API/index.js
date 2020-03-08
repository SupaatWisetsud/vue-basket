//เรียกใช้งาน module
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressFileupload = require('express-fileupload');
const mysql = require('mysql');
const path = require('path');

const app = express();

//ใช้ module ที่ require มา
app.use(cors());
app.use(expressFileupload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//ตั้งค่าการเชื่อมต่อ database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_basket"
});

//เชื่อมต่อ database
db.connect(err => {
    if(err) throw err; //ถ้าเชื่อมต่อไม่ได้จะเข้า if นี่
});

//ทำการระบบ path ของ api
app.route("/api/products")
    .get(selectProducts) // ถ้า get มาใน path /api/products จะ list ข้อมูลสินค้าทั้งหมด
    .post((req, res, next) => { // ถ้า post มาใน path /api/products จะเพิ่มข้อมูลสินค้า

        if(req.files !== null){ //เช็คว่ามี file upload มาไหม ถ้ามีก็จะทำการ upload file ภาพและ insert path ลง database
            const upload = req.files.p_img;
            upload.mv("./API/img/" + upload.name, err => {
                if (err) throw err;

                let sql = "INSERT INTO tb_product SET ? "; //คำสั่ง insert ลงใน table product
                db.query(sql, {...req.body, p_img: '/img/'+upload.name}, err => {
                    if(err) return res.status(500).json({ //ถ้าเกิดข้อผิดพลาดจะเข้า if นี่
                        "status": 500,
                        "message": "Internal Server Error" 
                    });
                    next(); //แต่ถ้าไม่เกิดข้อผิดพลาด ก็จะให้ทำงานใน middleware ต่อไปโดยคำสั่ง next();
                });
            });
        }
        else{ // else คือถ้าไม่มีการ upload file ภาพ เข้ามา
            let sql = "INSERT INTO tb_product SET ? ";
            db.query(sql, {...req.body, p_img: '/img/system.jpg'}, err => {
                if(err) return res.status(500).json({ //ถ้าเกิดข้อผิดพลาดจะเข้า if นี่
                    "status": 500,
                    "message": "Internal Server Error" 
                });
                next(); //แต่ถ้าไม่เกิดข้อผิดพลาด ก็จะให้ทำงานใน middleware ต่อไปโดยคำสั่ง next();
            });
        }
    }, selectProducts); //ซึ่ง middleware ถนัดไปจะเป็นการ select ข้อมูล product ทั้งหมด

// url params
app.route("/api/product/:id") 

    .get((req, res) => { // ถ้า get มาใน path /api/product/ ตามด้วย id ใน path จะ list ข้อมูลสินค้าของ id นั้น
        let sql = "SELECT * FROM tb_product WHERE p_id = ?";
        db.query(sql, [req.params.id], (err, results) => {
            if(err) return res.status(500).json({ //ถ้าเกิดข้อผิดพลาดจะเข้า if นี่
                "status": 500,
                "message": "Internal Server Error"
            });
            res.json(results); //ถ้าไม่เกิดข้อผิดพลาด ก็จะส่งข้อมูลออกไปได้
        })
    })

    .post((req, res, next) => { // ถ้า post มาใน path /api/product/ ตามด้วย id ใน path จะเป็นการ update ข้อมูลสินค้าของ id นั้น
        let sql = "UPDATE tb_product SET ? WHERE p_id = ? ";
        db.query(sql, [req.body, req.params.id], err => {
            if(err) return res.status(500).json({ //ถ้าเกิดข้อผิดพลาดจะเข้า if นี่
                "status": 500,
                "message": "Internal Server Error"
            });
            next(); //แต่ถ้าไม่เกิดข้อผิดพลาด ก็จะให้ทำงานใน middleware ต่อไปโดยคำสั่ง next();
        });
    }, selectProducts) //ซึ่ง middleware ถนัดไปจะเป็นการ select ข้อมูล product ทั้งหมด

    .delete((req, res, next) => { // ถ้า delete มาใน path /api/product/ ตามด้วย id ใน path จะเป็นการลบข้อมูลสินค้าของ id นั้น
        let sql = "DELETE FROM tb_product WHERE p_id = ? ";
        db.query(sql, [req.params.id], err => {
            if(err) return res.status(500).json({ //ถ้าเกิดข้อผิดพลาดจะเข้า if นี่
                "status": 500,
                "message": "Internal Server Error"
            });
            next(); //แต่ถ้าไม่เกิดข้อผิดพลาด ก็จะให้ทำงานใน middleware ต่อไปโดยคำสั่ง next();
        });
    }, selectProducts) //ซึ่ง middleware ถนัดไปจะเป็นการ select ข้อมูล product ทั้งหมด


//function get products
function selectProducts(req, res){
    let sql = "SELECT * FROM tb_product ORDER BY p_id DESC";
    db.query(sql, (err, results) => { //ถ้าเกิดข้อผิดพลาดจะเข้า if นี่
        if(err) return res.status(500).json({
            "status": 500,
            "message": "Internal Server Error" 
        })
        res.json(results); //ถ้าไม่เกิดข้อผิดพลาด ก็จะส่งข้อมูลออกไปได้
    });
}

//เปิด path /img ให้เป็น static สามารถเข้าถึกได้
app.use("/img", express.static(path.join(__dirname, '/img')));

//exec server running
app.listen(3000, () => {
    console.log(`Server is running.. is port: 3000 `);
});
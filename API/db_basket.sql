CREATE DATABASE db_basket CHARACTER SET utf8 COLLATE utf8_bin;

CREATE TABLE tb_product (
    p_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    p_name VARCHAR(250) NOT NULL,
    p_price INT DEFAULT 0,
    p_img VARCHAR(500) DEFAULT '/img/system.jpg'
);
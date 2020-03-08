<template>
  <b-container>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <div class="home">
          <b-form @submit="onSubmit" class="form-product">
            <b-form-group label="ชื่อสินค้า: " label-for="product-name">
              <b-form-input ref="productname" required></b-form-input>
            </b-form-group>

            <b-form-group label="ราคาสินค้า: " label-for="product-price">
              <b-form-input ref="productprice" type="number" required></b-form-input>
            </b-form-group>

            <b-form-group label="รูป: " label-for="img">
              <input type="file" ref="productimg" />
            </b-form-group>

            <b-button type="submit" variant="success" class="float-right">เพิ่ม</b-button>
            <b-button type="reset" variant="danger" class="float-left">ล้าง</b-button>
          </b-form>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>

    <!-- เรียกใช้ component UserTable -->
    <UserTable ref="usertable"/>

  </b-container>
</template>

<script>
import UserTable from '../components/UserTable';
import axios from 'axios';

export default {
  name: "Home",
  components:{
    UserTable
  },
  methods:{
    onSubmit(e){
      e.preventDefault();

      let fd = new FormData();

      fd.append("p_name", this.$refs.productname.$data.localValue);
      fd.append("p_price", this.$refs.productprice.$data.localValue);
      fd.append("p_img", this.$refs.productimg.files[0])

      axios.post("http://localhost:3000/api/products", fd)
        .then(res => {
            this.$refs.usertable.products = res.data;
            this.$refs.productname.$data.localValue = "";
            this.$refs.productprice.$data.localValue = "";
            this.$refs.productimg.value = "";
        })

    }
  },
  async mounted(){
    await axios.get(`http://localhost:3000/api/products`)
    .then(res => {
      this.$refs.usertable.products = res.data;
    })
  }
};
</script>

<style scoped>
.form-product{
  text-align: start;
}
</style>
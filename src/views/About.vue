<template>
  <b-container class="about">
    <h1>ตระกร้าสินค้า</h1>
    <p style="background-color: #82E0AA">ราคายอดรวม: {{$store.state.total}}</p>
    <table class="table">
      <thead>
        <tr>
          <th>No.</th>
          <th>รูปสินค้า</th>
          <th>ชื่อสินค้า</th>
          <th>ราคา</th>
          <th>จำนวน</th>
          <th>ลบ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in $store.state.basket" :key="index">
          <td>{{index + 1}}</td>
          <td>
            <img :src="`http://localhost:3000${product.p_img}`" width="80" />
          </td>
          <td>{{product.p_name}}</td>
          <td>{{product.p_price}}</td>
          <td>{{product.count}}</td>
          <td>
            <b-button variant="danger" @click="del(product.p_id)">ลบ</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>

<script>
export default {
  methods: {
    del(id){
      this.$store.dispatch("delProduct", id);
    }
  }
};
</script>
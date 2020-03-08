<template>
  <div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>No.</th>
          <th>รูปสินค้า</th>
          <th>ชื่อสินค้า</th>
          <th>ราคา</th>
          <th>หยิบใส่ตระกร้า</th>
          <th>แก้ไข</th>
          <th>ลบ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td>{{index + 1}}</td>
          <td>
            <img :src="`http://localhost:3000${product.p_img}`" width="80" />
          </td>
          <td>{{product.p_name}}</td>
          <td>{{product.p_price}}</td>
          <td>
            <b-button variant="success" @click="addBasket(product)">หยิบใส่ตระกร้า</b-button>
          </td>
          <td>
            <b-button variant="info" @click="edit(product.p_id)">แก้ไข</b-button>
          </td>
          <td>
            <b-button variant="danger" @click="del(product.p_id)">ลบ</b-button>
          </td>
        </tr>
      </tbody>
    </table>

    <ModalEdit ref="modalEdit" :loadData="loadData" />
  </div>
</template>

<script>
import axios from "axios";
import ModalEdit from "./ModalEdit";

export default {
  components: {
    ModalEdit
  },
  data: () => ({
    products: []
  }),
  methods: {
    del(id) {
      axios.delete(`http://localhost:3000/api/product/${id}`).then(res => {
        this.products = res.data;
      });
    },
    edit(id) {
      this.$refs.modalEdit.showModalEdit(id);
    },
    loadData(data) {
      this.products = data;
    },
    addBasket(data){
      this.$store.dispatch("addProduct", data);
    }
  }
};
</script>
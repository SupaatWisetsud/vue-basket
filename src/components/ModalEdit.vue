<template>
  <b-modal id="bvedit" :title="title" hide-footer>
    <b-form @submit="onSubmit" class="form-product">
      <b-form-group label="ชื่อสินค้า: " label-for="product-name">
        <b-form-input ref="productname" v-model="product.p_name" required></b-form-input>
      </b-form-group>

      <b-form-group label="ราคาสินค้า: " label-for="product-price">
        <b-form-input ref="productprice" v-model="product.p_price" type="number" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="success">แก้ไข</b-button>
    </b-form>
  </b-modal>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    id: 0,
    title: "",
    product: {}
  }),
  props: {
    loadData: Function
  },
  methods: {
    showModalEdit(id) {
      this.id = id;
      this.title = `UPDATE PRODUCT ID : ${id}`;

      axios.get(`http://localhost:3000/api/product/${id}`).then(res => {
        this.product = res.data[0];

        this.$bvModal.show("bvedit");
      });
    },
    onSubmit(e) {
      e.preventDefault();
      let fd = new FormData();

      fd.append("p_name", this.$refs.productname.$data.localValue);
      fd.append("p_price", this.$refs.productprice.$data.localValue);

      axios
        .post(`http://localhost:3000/api/product/${this.id}`, fd)
        .then(res => {
          this.$props.loadData(res.data);

          this.$bvModal.hide("bvedit");
        });
    }
  }
};
</script>
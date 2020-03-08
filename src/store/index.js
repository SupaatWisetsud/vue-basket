//บอกไปว่า vuex ดูตาม youtube 
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    basket: [],
    total: 0
  },
  mutations: {
    add(state, value) {

      //function เพิ่มสินค้าลงในตระกร้าสินค้า logic ตาม youtube บอกไปงี้น่ะ 5555
      let checkadd = false;

      let x = [].concat(state.basket);

      x.forEach(n => {
        if (n.p_id === value.p_id) {
          checkadd = true;
        }
      });

      if (checkadd) {
        for (const n of x) {
          if (n.p_id === value.p_id) {
            let i = Number.parseInt(n.count);
            i += 1;
            n.count = i;
          }
        }
      } else {
        let obj = Object.assign(value, { count: 1 });
        x.push(obj);
      }
      
      state.basket = x;

      let total = 0;
      state.basket.forEach(n => {
        total += n.count * parseInt(n.p_price)
      });
      state.total = total;
    },
    del(state, value) {
      //function ลบสินค้าลงในตระกร้าสินค้า logic ตาม youtube
      state.basket = state.basket.filter(n => n.p_id !== value);
      let total = 0;
      state.basket.forEach(n => {
        total += n.count * parseInt(n.p_price)
      });
      state.total = total;
    },
  },
  actions: {
    addProduct(context, data) {
      context.commit("add", data);
    },
    delProduct(context, data) {
      context.commit("del", data);
    }
  },
  modules: {}
});

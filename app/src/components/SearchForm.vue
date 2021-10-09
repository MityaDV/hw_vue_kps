<template>
  <div>
    <div class="wrapper">
      <div class="form">
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            v-model.trim="form.text"
            @keyup.enter="fetchBooks"
          />
        </div>
        <button class="btn btn-primary" @click="fetchBooks">
          {{ form.btnTitle }}
        </button>
      </div>
      <div class="cart">
        <router-link to="/cart">
          <img
            src="../assets/images/pngegg.png"
            alt="Изображение корзины"
            width="50px"
          />
        </router-link>
        <p v-show="cart.isTextActive">{{ cart.text }}</p>
      </div>
    </div>

    <Item
      v-for="item in result.items"
      :volume="item"
      :key="item.id"
      @priceproduct="getTextOrder"
      @clickModalButton="clickModal"
    />

    <div class="order" v-show="order.isOrder">
      <table class="order__table">
        <tr v-for="(prod, index) in this.cart.products" :key="index">
          <td>
            <img :src="prod.img" alt="" />
          </td>
          <td>{{ prod.desc }}</td>
          <td>{{ prod.amount }}</td>
        </tr>
      </table>
      <div>
        <span></span>
        <button>{{ order.btnTitle }}</button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";

export default {
  name: "SearchForm",
  components: {
    Item,
  },
  data() {
    return {
      url: process.env.VUE_APP_URL,
      type: this.$route.params.type,

      form: {
        text: "",
        btnTitle: "Отправить",
      },
      cart: {
        isTextActive: false,
        text: "",
        count: 0,
        total: 0,
        products: [],
      },
      order: {
        img: "",
        desc: "",
        prise: "",
        btnTitle: "Заказать",
        isOrder: false,
      },

      result: {
        items: [],
      },
    };
  },
  watch: {
    $route: function (newValue) {
      this.type = newValue.params.type;
      this.result.items = [];
      this.cart.isTextActive = false;
      this.order.isOrder = true;
    },
  },
  methods: {
    fetchBooks() {
      let init_items = [1, 2, 3, 4, 5, 6, 7];
      this.result.items = [];

      if (this.form.text == "") {
        alert("поле не может быть пустым");
        return;
      }
      fetch(this.url + this.form.text, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
          for (const i in init_items) {
            const it = json.items[i];
            this.result.items.push(it);
          }
        });
      this.form.text = "";
    },
    getTextOrder(obj) {
      this.cart.isTextActive = true;
      this.cart.count++;
      this.cart.total += obj.amount;
      this.cart.text = `Добавлено ${
        this.cart.count
      } товаров на сумму ${+this.cart.total.toFixed(2)} грн.`;
      this.getProductCart(obj);
    },
    getProductCart(obj) {
      let cartProduct = {};
      cartProduct.img = obj.img;
      cartProduct.desc = obj.desc;
      cartProduct.amount = obj.amount;
      this.cart.products.push(cartProduct);
    },
    clickModal() {
      this.$emit("clickModalButton");
    },
  },
};
</script>

<style lang="scss">
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

.form {
  margin-right: 15px;
}
.order {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

.order__table {
  min-width: 250px;
}
</style>

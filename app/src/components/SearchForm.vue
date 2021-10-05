<template>
  <div>
    <div class="form">
      <div class="form__group">
        <input class="form__input" type="text" v-model.trim="form.text" />
      </div>
      <button class="btn" @click="fetchBooks">{{ form.btnTitle }}</button>
    </div>
    <router-link class="link" to="/cart/user">
      <div class="cart">
        <span class="cart__img"></span>
        <p v-show="cart.isTextActive">{{ cart.text }}</p>
      </div>
    </router-link>
    <div class="block">
      <Item
        v-for="item in result.items"
        :volume="item"
        :key="item.id"
        @priceproduct="getTextOrder"
      />
    </div>
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
      this.cart.text = `Добавлено ${this.cart.count} товаров на сумму ${this.cart.total} гривен.`;
      this.getProductCart(obj);
    },
    getProductCart(obj) {
      let cartProduct = {};
      cartProduct.img = obj.img;
      cartProduct.desc = obj.desc;
      cartProduct.amount = obj.amount;
      this.cart.products.push(cartProduct);
    },
  },
};
</script>

<style lang="scss">
.form {
  margin: 0 0 10px;
  padding: 0;
}
.cart__img {
  background-image: url("../assets/images/pngegg.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: 50px;
  height: 50px;
  display: flex;
}
.form__group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.cart {
  display: flex;
  flex-wrap: wrap;
}
.btn {
  width: 100px;
}
.link {
  display: block;
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

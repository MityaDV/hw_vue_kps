<template>
  <div>
    <div class="wrapper">
      <div class="form col-md-4">
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            v-model.trim="searchText"
            @keyup.enter="fetchBooks"
          />
        </div>
        <button class="btn btn-primary" @click="fetchBooks">
          {{ btnFormTitle }}
        </button>
      </div>
      <div class="cart col-md-4">
        <router-link to="/cart">
          <img
            src="../assets/images/pngegg.png"
            alt="Изображение корзины"
            width="50px"
          />
        </router-link>
        <p class="text-warning" v-show="cart.isTextActive">{{ cart.text }}</p>
      </div>
    </div>

    <Item
      v-for="item in items"
      :volume="item"
      :key="item.id"
      @clickModalButton="clickModal"
    />

    <router-view></router-view>

    <div v-show="order.isOrder">
      <table>
        <tr
          class="row"
          v-for="(prod, index) in this.cart.products"
          :key="index"
        >
          <td class="col-md-2">
            <img :src="prod.img" alt="" />
          </td>
          <td class="col-md-8 small text-info text-left">
            {{ prod.desc }}
          </td>
          <td class="col-md-2 text-danger mark lead">
            {{ `${prod.amount} грн.` }}
          </td>
        </tr>
      </table>
      <div style="margin: 15px 0 0" v-if="order.isTotalOrder">
        <span class="lead text-info" style="margin: 0 15px 0 0"
          ><u>Сумма к оплате: {{ this.cart.total }}</u></span
        >
        <router-link to="/" class="btn btn-primary" @click="closeOrder">
          {{ order.btnTitle }}
        </router-link>
      </div>
    </div>
    <div class="success" v-show="order.isSuccess">
      <p class="text-success">
        {{ `Ваш заказ на сумму ${this.cart.total}  грн. успешно оформлен` }}
      </p>
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";
import { EventBus } from "../main";
import { mapGetters } from "vuex";

export default {
  name: "SearchForm",
  components: {
    Item,
  },
  data() {
    return {
      url: process.env.VUE_APP_URL,
      type: this.$route.params.type,
      searchText: "",
      btnFormTitle: "Отправить",
      cart: {
        isTextActive: false,
        text: "",
        count: 0,
        total: 0,
        products: [],
      },
      order: {
        btnTitle: "Заказать",
        isOrder: false,
        isSuccess: false,
        isTotalOrder: true,
      },
    };
  },
  watch: {
    $route: function (newValue) {
      this.type = newValue.params.type;
      this.$store.commit("cleanItems");
      this.cart.isTextActive = false;
      this.order.isOrder = true;
    },
  },
  computed: {
    ...mapGetters({
      items: "getItems",
    }),
  },
  methods: {
    fetchBooks() {
      this.$store.dispatch("getItems", this.url + this.searchText);
      this.searchText = "";
    },
    getInfoOrder(obj) {
      this.cart.isTextActive = true;
      this.cart.count++;
      this.cart.total += obj.amount;
      this.cart.text = `Добавлено ${
        this.cart.count
      } товар(ов) на сумму ${+this.cart.total.toFixed(2)} грн.`;
      let cartProduct = {};
      cartProduct.img = obj.img;
      cartProduct.desc = obj.desc;
      cartProduct.amount = obj.amount;
      this.cart.products.push(cartProduct);
    },
    clickModal() {
      this.$emit("clickModalButton");
    },
    closeOrder() {
      EventBus.$emit("clearTitle");
      this.cart.products = [];
      this.order.isTotalOrder = false;
      this.order.isOrder = false;
      this.order.isSuccess = true;
      setTimeout(() => (this.order.isSuccess = false), 5000);
    },
  },
  mounted() {
    EventBus.$on("priceproduct", (obj) => this.getInfoOrder(obj));
  },
};
</script>

<style lang="scss">
$color_success: #02c232;

.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  margin: 0 0 15px calc(100% - (100% - 25%));
}

.cart {
  display: flex;
  align-items: center;

  & a {
    padding-right: 10px;
  }
}

.success {
  min-width: 300px;
  min-height: 300px;
  background-color: rgb(250, 250, 250);
  box-shadow: 0 10px 20px rgba(4, 6, 6, 0.2);
  outline: 1px solid $color_success;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
</style>

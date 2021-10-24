<template>
  <div
    id="app"
    class="container"
    style="position: relative"
    @keyup.esc="closeOverlayScreen"
  >
    <h2 class="text-primary">{{ title }}</h2>

    <SearchForm />

    <div class="cart col-md-4">
      <router-link
        :to="{ name: 'cart', params: { total: total } }"
        tag="div"
        @click="clickForCart"
        :total="total"
      >
        <img
          src="./assets/images/pngegg.png"
          alt="Изображение корзины"
          width="50px"
        />
      </router-link>
      <p class="text-warning" v-show="isTextActive">{{ textOrder }}</p>
    </div>

    <router-view></router-view>

    <div :class="showOverlay" @click.left="closeOverlayScreen"></div>

    <div class="success" v-show="isSuccess">
      <p class="text-success">
        {{ `Ваш заказ на сумму ${this.total}  грн. успешно оформлен` }}
      </p>
    </div>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue";
import { EventBus } from "./main.js";

export default {
  name: "App",
  components: {
    SearchForm,
  },
  data() {
    return {
      title: "Google Search Books",
      isTextActive: false,
      isSuccess: false,
      textOrder: "",
      count: 0,
      total: 0,

      showOverlay: {
        overlay: true,
        overlay_open: false,
      },
    };
  },
  watch: {
    $route: function (newValue, oldValue) {
      if (newValue.name === "cart") {
        return;
      } else if (oldValue.name === "cart") {
        this.closeCart();
      }
    },
  },
  methods: {
    getInfoOrder(price) {
      this.isTextActive = true;
      this.count++;
      this.total += +price.toFixed(2);
      this.textOrder = `Добавлено ${this.count} товар(ов) на сумму ${this.total} грн.`;
    },
    clickForCart() {
      EventBus.$emit("openCart");
    },
    showOverlayScreen() {
      if (this.showOverlay.overlay) {
        this.showOverlay.overlay_open = true;
        document.querySelector("body").style.overflow = "hidden";
      }
    },
    closeOverlayScreen() {
      if (this.showOverlay.overlay_open) {
        this.showOverlay.overlay_open = false;
        document.querySelector("body").style.overflow = "visible";
        EventBus.$emit("closeModal");
      }
    },
    closeCart() {
      this.isSuccess = true;
      this.isTextActive = false;
      setTimeout(() => (this.isSuccess = false), 5000);
    },
  },

  mounted() {
    EventBus.$on("priceproduct", (price) => {
      this.getInfoOrder(price);
      this.showOverlay.overlay_open = false;
      document.querySelector("body").style.overflow = "visible";
    });
    EventBus.$on("clickModalButton", () => this.showOverlayScreen());
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

li {
  list-style: none;
}

.cart {
  display: flex;
  align-items: center;
  position: absolute;
  cursor: pointer;
  top: 0;
  right: 0;

  & a {
    padding-right: 10px;
  }
}

.overlay {
  $color_white_90: rgba(255, 255, 255, 0.9);

  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  height: 100%;
  display: none;
  background: $color_white_90;
}

.overlay_open {
  display: block;
}
</style>

import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Cart from "@/components/Cart.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [{ path: "/cart/:type", component: Cart }];

const router = new VueRouter({
  routes,
  mode: "history",
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

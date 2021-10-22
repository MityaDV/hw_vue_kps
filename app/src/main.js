import Vue from "vue";
import store from "./store";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import Cart from "@/components/Cart.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuelidate);

export const EventBus = new Vue();

const routes = [{ path: "/cart", component: Cart }];
const router = new VueRouter({
  routes,
  mode: "history",
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import Cart from "@/components/Cart.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuelidate);

const routes = [{ path: "/cart", component: Cart }];

const router = new VueRouter({
  routes,
  mode: "history",
});

export const EventBus = new Vue();

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

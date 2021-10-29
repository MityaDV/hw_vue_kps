<template>
  <div>
    <h3 class="text-success">{{ title }}</h3>
    <div v-show="order.isOrder">
      <table class="table-bordered">
        <tr
          class="row"
          v-for="(prod, index) in this.order.products"
          :key="index"
        >
          <td class="col-md-2">
            <img :src="prod.volumeInfo.imageLinks.smallThumbnail" alt="" />
          </td>
          <td class="col-md-8 small text-info text-left">
            {{ prod.volumeInfo.description }}
          </td>
          <td class="col-md-2 text-danger mark lead">
            {{ `${order.price} грн.` }}
          </td>
          <!-- <td v-else class="col-md-2 text-danger mark lead">
            {{ `${order.price} грн.` }}
          </td> -->
        </tr>
      </table>
      <div style="margin: 15px 0 0" v-if="order.isTotalOrder">
        <span class="lead text-info" style="margin: 0 15px 0 0"
          ><u>Сумма к оплате: {{ total }}</u></span
        >
        <router-link to="/" class="btn btn-primary">
          {{ order.btnTitle }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../main";
export default {
  name: "Cart",
  props: ["total"],
  data() {
    return {
      title: "Список заказанных товаров",
      order: {
        btnTitle: "Заказать",
        isOrder: false,
        isSuccess: false,
        isTotalOrder: true,
        products: [],
        price: 0,
        // forSale: true,
      },
    };
  },

  methods: {
    getProtuctsOrder() {
      this.$store.getters.getProducts.forEach((it) => {
        if (it.saleInfo.saleability === "FOR_SALE") {
          this.order.price = it.saleInfo.listPrice.amount;
          this.order.products.push(it);
          return;
        } else if (it.saleInfo.saleability === "NOT_FOR_SALE") {
          this.order.price = 0;
          this.order.products.push(it);
          // this.order.forSale = false;
        }
      });

      this.order.isOrder = true;
    },
  },
  created() {
    EventBus.$on("openCart", this.getProtuctsOrder());
  },
};
</script>

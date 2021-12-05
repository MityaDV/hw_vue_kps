<template>
  <v-row class="justify-end">
    <v-col cols="4">
      <v-card class="d-flex align-center">
        <v-btn icon tile nuxt plain to="/cart">
          <v-icon v-if="productCount < 1" color="primary"
            >mdi-cart-minus</v-icon
          >
          <v-icon v-else color="primary">mdi-cart-plus</v-icon>
        </v-btn>
        <v-card-text v-if="productCount < 1">
          {{ textOrder }}
        </v-card-text>
        <v-card-text v-else>
          В корзине {{ productCount }} товар(ов) на сумму {{ totalPrice }} грн.
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      textOrder: 'Корзина пуста',
      empty: true,
    };
  },
  computed: {
    productCount() {
      return this.$store.getters.getProductsCount;
    },
    totalPrice() {
      return this.$store.getters.getTotal;
    },
  },
};
</script>

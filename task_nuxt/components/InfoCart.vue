<template>
  <v-row class="justify-end">
    <v-col cols="4">
      <v-card class="d-flex align-center">
        <v-btn icon tile nuxt plain to="/cart">
          <v-icon v-if="empty" color="primary">mdi-cart-minus</v-icon>
          <v-icon v-else color="primary">mdi-cart-plus</v-icon>
        </v-btn>
        <v-card-text>
          {{ productCount }}
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
  },
};
</script>

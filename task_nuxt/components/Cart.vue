<template>
  <v-row>
    <v-col class="d-flex justify-center" cols="12" lg="12" md="6">
      <!-- <nuxt-link to="/cart"> -->
      <img
        src="./../assets/pngegg.png"
        width="60"
        height="50"
        alt="иконка корзины"
      />
      <!-- </nuxt-link> -->
      <v-card-text>
        <p>Текст заказа</p>
      </v-card-text>
    </v-col>
    <!-- <v-col class="text-center">
      <v-btn to="/" depressed color="primary"> Primary </v-btn>
    </v-col> -->
  </v-row>
</template>

<script>
export default {
  name: 'Cart',
}
</script>

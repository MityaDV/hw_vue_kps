<template>
  <v-row justify="center">
    <!-- <v-dialog persistent max-width="300"> -->
    <v-card>
      <v-card-text>
        Ваш заказ на сумму {{ total }} грн. успешно выполнен!
      </v-card-text>
    </v-card>
    <!-- </v-dialog> -->
  </v-row>
</template>

<script>
// import { EventBus } from './../plugins/EventBus';
export default {
  name: 'Success',
  data() {
    return {
      // isSuccess: false,
    };
  },
  computed: {
    total() {
      return this.$store.getters.getTotal;
    },
  },
  // mounted() {
  //   EventBus.$on('closeCart', () => this.cleanData());
  // },
  // methods: {
  //   cleanData() {
  //     this.isSuccess = true;
  //     setTimeout(() => {
  //       this.isSuccess = false;
  //     }, 5000);
  //   },
  // },
};
</script>

<style></style>

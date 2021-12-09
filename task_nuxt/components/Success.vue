<template>
  <div>
    <v-card>
      <v-card-text>
        Ваш заказ на сумму {{ total }} грн. успешно выполнен!
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Success',

  computed: {
    total() {
      return this.$store.getters.getTotal;
    },
  },
};
</script>

<style></style>

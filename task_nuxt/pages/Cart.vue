<template>
  <v-row class="align-center flex-column">
    <v-col v-for="prod in products" :key="prod.id" cols="8">
      <v-card class="pa-2" outlined elevation="2">
        <div class="d-flex flex-no-wrap">
          <v-avatar tile height="153" min-width="100" class="mr-4">
            <v-img
              v-if="prod.volumeInfo.imageLinks"
              :alt="alt"
              :src="prod.volumeInfo.imageLinks.thumbnail"
            />
            <v-img
              v-else
              :alt="alt"
              src="http://via.placeholder.com/128x181/808080/FFFFFF?text=No cover"
            />
          </v-avatar>
          <v-card-text
            class="
              text-caption
              light-blue--text
              text--darken-1
              overflow-y-hidden
              pa-0
            "
            style="max-height: 120px"
          >
            {{ prod.volumeInfo.description }}
          </v-card-text>
          <span
            class="
              d-flex
              align-center
              text-no-wrap
              px-2
              green
              lighten-5
              light-blue--text
            "
          >
            {{ price }} грн.</span
          >
        </div>
      </v-card>
    </v-col>
    <v-col cols="8" class="d-flex justify-center align-center">
      <span class="px-2 light-blue--text">
        Сума к оплате: {{ total }} грн.
      </span>
      <v-dialog v-model="dialog" max-width="400">
        <template #activator="{ on, attrs }">
          <v-btn
            depressed
            color="primary"
            :atrrs="attrs"
            v-on="on"
            @click="cleanData"
            >Заказать</v-btn
          >
        </template>
        <v-card>
          <v-card-text>
            Ваш заказ на сумму {{ total }} грн. успешно выполнен!
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
// import { EventBus } from './../plugins/EventBus';
export default {
  name: 'Cart',
  data() {
    return {
      alt: 'Изображение обложки тома',
      dialog: false,
    };
  },
  computed: {
    products() {
      return this.$store.getters.getProducts;
    },
    total() {
      return this.$store.getters.getTotal;
    },
    price() {
      return this.$store.getters.getOnePrice;
    },
  },
  methods: {
    cleanData() {
      setTimeout(() => {
        this.dialog = false;
        this.$router.push('/');
      }, 5000);
    },
  },
};
</script>

<style></style>

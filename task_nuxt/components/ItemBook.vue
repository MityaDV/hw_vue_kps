<template>
  <v-row class="justify-center">
    <v-col v-for="item in items" :key="item.id" cols="8">
      <v-card
        v-if="item.saleInfo.saleability === 'NOT_FOR_SALE'"
        class="pa-2 not_for_sale"
        outlined
        elevation="2"
        style="position: relative"
      >
        <div class="d-flex flex-no-wrap">
          <v-avatar tile height="181" min-width="128" class="mr-4">
            <v-img
              v-if="item.volumeInfo.imageLinks"
              :alt="card.imgAlt"
              :src="item.volumeInfo.imageLinks.thumbnail"
            />
            <v-img
              v-else
              :alt="card.imgAlt"
              src="http://via.placeholder.com/128x181/808080/FFFFFF?text=No cover"
            />
          </v-avatar>
          <div
            class="
              d-flex
              flex-column flex-grow-1
              align-center
              justify-space-between
            "
          >
            <h5 class="text-h5 text-center light-blue--text text--darken-3">
              {{ item.volumeInfo.title }}
            </h5>
            <span
              v-if="item.volumeInfo.authors === undefined"
              class="
                text-subtitle-2 text-center
                light-blue--text
                text--darken-1
              "
              >Author is unknown</span
            >
            <template v-else class="d-flex flex-column">
              <span
                v-for="(autor, index) in item.volumeInfo.authors"
                :key="index"
                class="
                  text-subtitle-2 text-center
                  light-blue--text
                  text--darken-1
                "
                >{{ autor }}</span
              >
            </template>
            <span
              v-if="item.volumeInfo.publishedDate"
              class="text-caption light-blue--text"
            >
              {{ item.volumeInfo.publishedDate | changeDate }}
            </span>
            <span v-else class="text-caption light-blue--text">
              Date is unknown
            </span>
            <v-btn
              max-height="36"
              depressed
              color="primary lighten-1"
              elevation="3"
              class="align-self-center"
              @click="openModal"
            >
              {{ card.btnTitle }}
            </v-btn>
          </div>
        </div>
      </v-card>
      <v-card v-else class="pa-2" outlined elevation="2">
        <div class="d-flex flex-no-wrap">
          <v-avatar tile height="181" min-width="128" class="mr-4">
            <v-img
              v-if="item.volumeInfo.imageLinks"
              :alt="card.imgAlt"
              :src="item.volumeInfo.imageLinks.thumbnail"
            />
            <v-img
              v-else
              :alt="card.imgAlt"
              src="http://via.placeholder.com/128x181/808080/FFFFFF?text=No cover"
            />
          </v-avatar>
          <div
            class="
              d-flex
              flex-column flex-grow-1
              align-center
              justify-space-between
            "
          >
            <h5 class="text-h5 text-center light-blue--text text--darken-3">
              {{ item.volumeInfo.title }}
            </h5>
            <span
              v-if="item.volumeInfo.authors === undefined"
              class="
                text-subtitle-2 text-center
                light-blue--text
                text--darken-1
              "
              >Author is unknown</span
            >
            <template v-else class="d-flex flex-column">
              <span
                v-for="(autor, index) in item.volumeInfo.authors"
                :key="index"
                class="
                  text-subtitle-2 text-center
                  light-blue--text
                  text--darken-1
                "
                >{{ autor }}</span
              >
            </template>
            <span
              v-if="item.volumeInfo.publishedDate"
              class="text-caption light-blue--text"
            >
              {{ item.volumeInfo.publishedDate | changeDate }}
            </span>
            <span v-else class="text-caption light-blue--text">
              Date is unknown
            </span>
            <v-btn
              max-height="36"
              depressed
              color="primary lighten-1"
              elevation="3"
              class="align-self-center"
              @click="openModal(item)"
            >
              {{ card.btnTitle }}
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { EventBus } from '../plugins/EventBus';

export default {
  name: 'ItemBook',
  filters: {
    changeDate(date) {
      return date.split('-').reverse().join('.');
    },
  },

  data() {
    return {
      isActive: false,
      product: {},
      price: 0,
      // notForSale: true,

      card: {
        imgAlt: 'Изображение обложки тома',
        btnTitle: 'Заказать',
      },
    };
  },

  computed: {
    items() {
      return this.$store.getters.getItems;
    },
  },
  methods: {
    openModal(item) {
      EventBus.$emit('openModal', item);
    },
  },
};
</script>

<style lang="scss">
$color_blue_sky: #00b2ff;
$color_error: #f04124;
$color_not_for_sale: rgba(238, 238, 238, 0.7);

.not_for_sale {
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    background-color: $color_not_for_sale;
  }
  &::after {
    content: 'NOT FOR SALE';
    position: absolute;
    z-index: 4;
    top: 7%;
    right: 3%;
    padding: 15px 0 0;
    width: 70px;
    height: 70px;
    font-size: 12px;
    line-height: 18px;
    font-weight: bold;
    text-align: center;
    color: $color_error;
    border-color: transparent;
    border: 4px solid $color_error;
    border-radius: 50%;
    transform: rotate(15deg);
  }
}

.error {
  color: $color_error;
  position: absolute;
}

.item_autor {
  display: flex;
  flex-direction: column;
}
</style>

<template>
  <v-row>
    <v-col v-for="item in items" :key="item.id" cols="12">
      <v-card class="pa-2">
        <div class="d-flex flex-no-wrap">
          <v-avatar tile height="181" min-width="128">
            <v-img
              v-if="item.volumeInfo.imageLinks"
              :alt="card.imgAlt"
              :src="item.volumeInfo.imageLinks.thumbnail"
            />
            <v-img
              v-else
              :alt="card.imgAlt"
              src="./../assets/placeholder_book.svg"
            />
          </v-avatar>
          <div class="d-flex flex-column justify-center">
            <h4 class="text-h5">{{ item.volumeInfo.title }}</h4>
            <div>
              <span
                v-for="(autor, index) in item.volumeInfo.authors"
                :key="index"
                >{{ autor }}</span
              >
            </div>
            <span>
              {{ item.volumeInfo.publishedDate }}
            </span>
          </div>
        </div>
        <v-btn depressed color="primary" @click="openModal">
          {{ card.btnTitle }}
        </v-btn>
      </v-card>
    </v-col>

    <div v-if="notForSale" class="not_for_sale"></div>
  </v-row>
</template>

<script>
import { EventBus } from '../plugins/EventBus';

export default {
  name: 'ItemBook',

  data() {
    return {
      isActive: false,
      product: {},
      price: 0,
      notForSale: false,

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
    openModal() {
      EventBus.$emit('openModal');
      // this.$nextTick(() => {
      //   this.$refs.name.focus();
      // });
    },
    // openModal(item) {
    //   if (item.saleInfo.saleability === 'FOR_SALE') {
    //     if (this.modal.showModal.popup) {
    //       this.modal.showModal.popup_open = true;
    //       EventBus.$emit('clickModalButton');
    //       this.$nextTick(() => {
    //         this.$refs.name.focus();
    //       });
    //     }
    //   } else if (item.saleInfo.saleability === 'NOT_FOR_SALE') {
    //     this.notForSale = true;
    //   }
    // },
    // addProduct() {
    //   this.price = this.item.saleInfo.listPrice.amount;
    //   // EventBus.$emit('priceproduct', this.price);
    //   this.$store.commit('addProduct', this.item);
    //   this.modal.showModal.popup_open = false;
    // },
  },

  // mounted() {
  // EventBus.$on('closeModal', () => (this.showModal.popup_open = false));
  // },
};
</script>

<style lang="scss">
$color_blue_sky: #00b2ff;
$color_error: #f04124;
$color_not_for_sale: rgba(238, 238, 238, 0.7);

// .item {
//   display: flex;
//   // flex-direction: column;
//   // position: relative;
//   min-width: 300px;
//   max-width: 300px;
//   margin: 0 auto;
// }

// .list {
//   margin-bottom: 0;
// }

.not_for_sale {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  background-color: $color_not_for_sale;

  &::before {
    content: 'NOT FOR SALE';
    position: absolute;
    top: 2%;
    right: 2%;
    width: 60px;
    height: 60px;
    font-weight: bold;
    border-color: transparent;
    border: 2px solid $color_error;
    border-radius: 50%;
    font-size: 10px;
    line-height: 18px;
    padding: 12px 0 0;
    color: $color_error;
    transform: rotate(15deg);
  }
}

.error {
  color: $color_error;
  position: absolute;
}

// .form-group {
//   position: relative;
// }

.item_autor {
  display: flex;
  flex-direction: column;
}
</style>

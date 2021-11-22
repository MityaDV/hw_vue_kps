<template>
  <div class="item">
    <ul class="list-group list">
      <li v-for="item in items" :key="item.id" class="list-group-item">
        <img
          v-if="item.volumeInfo.imageLinks"
          :alt="card.imgAlt"
          :src="item.volumeInfo.imageLinks.thumbnail"
        />
        <img v-else :alt="card.imgAlt" src="./../assets/placeholder_book.svg" />
        <h4 class="text-primary">{{ item.volumeInfo.title }}</h4>
        <div class="list-group-item item_autor">
          <span
            v-for="(autor, index) in item.volumeInfo.authors"
            :key="index"
            >{{ autor }}</span
          >
        </div>
        <span>
          {{ item.volumeInfo.publishedDate }}
        </span>
        <button class="btn btn-primary" @click.prevent="openModal(item)">
          {{ card.btnTitle }}
        </button>
      </li>
    </ul>

    <div v-if="notForSale" class="not_for_sale"></div>
  </div>
</template>

<script>
// import { EventBus } from '../main';

export default {
  name: 'Item',

  data() {
    return {
      isActive: false,
      product: {},
      price: 0,

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
      if (item.saleInfo.saleability === 'FOR_SALE') {
        if (this.modal.showModal.popup) {
          this.modal.showModal.popup_open = true;
          // EventBus.$emit('clickModalButton');
          this.$nextTick(() => {
            this.$refs.name.focus();
          });
        }
      } else if (item.saleInfo.saleability === 'NOT_FOR_SALE') {
        this.notForSale = true;
      }
    },
    addProduct() {
      this.price = this.item.saleInfo.listPrice.amount;
      // EventBus.$emit('priceproduct', this.price);
      this.$store.commit('addProduct', this.item);
      this.modal.showModal.popup_open = false;
    },
  },

  // mounted() {
  //   EventBus.$on('closeModal', () => (this.modal.showModal.popup_open = false));
  // },
};
</script>

<style lang="scss">
$color_blue_sky: #00b2ff;
$color_error: #f04124;
$color_not_for_sale: rgba(238, 238, 238, 0.7);

.item {
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 300px;
  max-width: 300px;
  margin: 0 auto 15px;
}

.list {
  margin-bottom: 0;
}

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

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 100;

  display: none;
  padding: 15px;
  outline: 1px solid $color_blue_sky;
  background-color: rgb(250, 250, 250);
  box-shadow: 0 10px 20px rgba(4, 6, 6, 0.2);
  transform: translateX(-50%) translateY(-50%);

  @keyframes departure {
    0% {
      transform: translateX(-200%) translateY(-50%);
    }

    70% {
      transform: translateX(-30%) translateY(-50%);
    }

    90% {
      transform: translateX(-70%) translateY(-50%);
    }

    100% {
      transform: translateX(-50%) translateY(-50%);
    }
  }
}
.popup_open {
  display: block;
  transition: ease-out;
  animation-name: departure;
  animation-duration: 0.7s;
  will-change: transform;
}

.error {
  color: $color_error;
  position: absolute;
}

.form-group {
  position: relative;
}

.item_autor {
  display: flex;
  flex-direction: column;
}
</style>

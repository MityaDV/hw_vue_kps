<template>
  <div>
    <ul class="card__list">
      <li class="card__item">
        <img :src="volume.volumeInfo.imageLinks.thumbnail" :alt="card.imgAlt" />
      </li>
      <li class="card__item">
        <span>{{ volume.volumeInfo.title }}</span>
        <div class="modal" v-show="isActive">
          <div>
            <img
              :src="volume.volumeInfo.imageLinks.smallThumbnail"
              :alt="card.imgAlt"
            />
            <p>{{ volume.volumeInfo.description }}</p>
            <form class="form">
              <ul class="form__list">
                <li class="form__item">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Введите Ваше имя"
                    required
                  />
                  <label for="phone-number" aria-label="Ваш телефон"></label>
                </li>
                <li class="form__item">
                  <input
                    type="tel"
                    id="phone-number"
                    name="phone-number"
                    placeholder="+3 Введите 11 цифр номера"
                    required
                  />
                  <label for="phone-number" aria-label="Ваш телефон"></label>
                </li>
                <li class="form__item">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-mail"
                  />
                  <label
                    for="email"
                    aria-label="Ваш адрес электронной почты"
                  ></label>
                </li>
              </ul>
              <button class="btn form__btn" @click.prevent="addProduct()">
                Отправить
              </button>
            </form>
          </div>
        </div>
      </li>
      <li
        class="card__item"
        v-for="(autor, index) in volume.volumeInfo.authors"
        :key="index"
      >
        <span>{{ autor }}</span>
      </li>
      <li class="card__item">
        <span>
          {{ volume.volumeInfo.publishedDate }}
        </span>
      </li>
      <button class="card__btn" @click.prevent="openModal">Заказать</button>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    volume: {
      type: Object,
    },
  },
  data() {
    return {
      isActive: false,
      card: {
        imgAlt: "Изображение обложки тома",
      },
      form: {
        productData: {
          counter: 0,
          sum: 0,
        },
      },
    };
  },
  methods: {
    openModal() {
      this.isActive = true;
    },
    addProduct() {
      this.form.productData.sum += this.volume.saleInfo.listPrice.amount;
      this.form.productData.counter++;
      this.$emit("priceproduct", {
        count: this.form.productData.counter,
        sum: this.form.productData.sum,
      });
    },
  },
};
</script>

<style lang="scss">
.card__list {
  list-style: none;
  margin: 0 0 10px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
}

.modal {
  padding: 10px;
  border: 1px solid black;
  border-radius: 6px;
  background-color: #a5a7b9;
}

.form__list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>

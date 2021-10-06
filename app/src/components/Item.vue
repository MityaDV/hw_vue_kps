<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item">
        <img
          :src="volume.volumeInfo.imageLinks.smallThumbnail"
          :alt="card.imgAlt"
        />
      </li>
      <li class="list-group-item">
        <h3 class="text-primary">{{ volume.volumeInfo.title }}</h3>
        <div class="container-fluid" v-show="isActive">
          <div class="row">
            <div class="col-md-2">
              <img
                :src="volume.volumeInfo.imageLinks.smallThumbnail"
                :alt="card.imgAlt"
              />
            </div>
            <div class="col-md-10">
              <p class="text-primary smal text-left">
                {{ volume.volumeInfo.description }}
              </p>
              <form class="form-horizontal">
                <div class="form-group">
                  <label
                    class="control-label col-md-2"
                    for="name"
                    aria-label="Имя пользователя"
                    >Имя пользователя:</label
                  >
                  <div class="col-md-10">
                    <input
                      class="form-control"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Введите ваше имя"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label
                    class="control-label col-md-2"
                    for="phone-number"
                    aria-label="Ваш телефон"
                    >Phone number:</label
                  >
                  <div class="col-md-10">
                    <input
                      class="form-control"
                      type="tel"
                      id="phone-number"
                      name="phone-number"
                      placeholder="+3 Введите 11 цифр номера"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label
                    class="control-label col-md-2"
                    for="email"
                    aria-label="Ваш адрес электронной почты"
                    >Email:</label
                  >
                  <div class="col-md-10">
                    <input
                      class="form-control"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="someone@example.com"
                    />
                  </div>
                </div>
                <button
                  class="btn-info"
                  :disabled="modal.isButtonDisabled"
                  @click.prevent="addProduct"
                >
                  {{ modal.btnTitle }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </li>
      <li
        class="list-group-item"
        v-for="(autor, index) in volume.volumeInfo.authors"
        :key="index"
      >
        <span>{{ autor }}</span>
      </li>
      <li class="list-group-item">
        <span>
          {{ volume.volumeInfo.publishedDate }}
        </span>
      </li>
      <button class="btn-primary" @click.prevent="openModal">
        {{ card.btnTitle }}
      </button>
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
        btnTitle: "Заказать",
      },
      modal: {
        btnTitle: "Отправить",
        isButtonDisabled: true,
      },
    };
  },
  methods: {
    openModal() {
      this.isActive = true;
    },
    addProduct() {
      this.$emit("priceproduct", {
        img: this.volume.volumeInfo.imageLinks.smallThumbnail,
        desc: this.volume.volumeInfo.description,
        amount: this.volume.saleInfo.listPrice.amount,
      });
    },
  },
};
</script>

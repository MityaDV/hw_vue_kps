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
        <div class="container-fluid" :class="modal.showModal">
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
                      :required="modal.isRequired"
                      v-model.trim="modal.modalFormInput.name"
                      ref="name"
                    />
                    <b
                      class="small text-danger"
                      v-if="modal.errors.error_name"
                      >{{ modal.errors.textName }}</b
                    >
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
                      :required="modal.isRequired"
                      v-model.trim="modal.modalFormInput.tel"
                    />
                    <b
                      class="small text-danger"
                      v-if="modal.errors.error_tel"
                      >{{ modal.errors.textTel }}</b
                    >
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
                      :required="modal.isRequired"
                      v-model.trim="modal.modalFormInput.email"
                    />
                    <b
                      class="small text-danger"
                      v-if="modal.errors.error_email"
                      >{{ modal.errors.textEmail }}</b
                    >
                  </div>
                </div>
                <button
                  class="btn btn-info"
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
      <button class="btn btn-primary" @click.prevent="openModal">
        {{ card.btnTitle }}
      </button>
    </ul>
  </div>
</template>

<script>
import { EventBus } from "../main";
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
        isButtonDisabled: false,
        isRequired: true,

        modalFormInput: {
          name: null,
          tel: null,
          email: null,
        },
        showModal: {
          popup: true,
          popup_open: false,
        },
        errors: {
          error_name: false,
          error_tel: false,
          error_email: false,
          textName: "Укажите имя",
          textTel: "Укажите корректный телефон",
          textEmail: "Укажите корректный адрес электронной почты",
        },
      },
    };
  },

  methods: {
    openModal() {
      if (this.modal.showModal.popup) {
        this.modal.showModal.popup_open = true;
        this.$emit("clickModalButton");
        this.$nextTick(() => {
          this.$refs.name.focus();
        });
      }
    },
    addProduct() {
      this.$emit("priceproduct", {
        img: this.volume.volumeInfo.imageLinks.smallThumbnail,
        desc: this.volume.volumeInfo.description,
        amount: this.volume.saleInfo.listPrice.amount,
      });
    },
    chechFormModal() {
      if (
        !this.modal.modalFormInput.name ||
        this.modal.modalFormInput.name.length <= 2
      ) {
        this.modal.errors.error_name = true;
      }
    },
  },
  created() {
    this.chechFormModal();
  },
  mounted() {
    EventBus.$on("closeModal", () => (this.modal.showModal.popup_open = false));
  },
};
</script>

<style lang="scss">
$color_blue_sky: #00b2ff;

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 100;

  display: none;
  width: 900px;
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
</style>

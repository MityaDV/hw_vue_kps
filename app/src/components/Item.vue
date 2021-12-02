<template>
  <div class="item">
    <ul class="list-group list">
      <li class="list-group-item">
        <img
          :src="volume.volumeInfo.imageLinks.smallThumbnail"
          :alt="card.imgAlt"
        />
      </li>
      <li class="list-group-item">
        <h3 class="text-primary">{{ volume.volumeInfo.title }}</h3>
      </li>
      <li class="list-group-item item_autor">
        <span
          v-for="(autor, index) in volume.volumeInfo.authors"
          :key="index"
          >{{ autor }}</span
        >
      </li>
      <li class="list-group-item">
        <span>
          {{ volume.volumeInfo.publishedDate }}
        </span>
      </li>
    </ul>
    <button class="btn btn-primary" @click.prevent="openModal">
      {{ card.btnTitle }}
    </button>
    <!-- <button @click="checkVolume">Check</button> -->
    <div v-if="notForSale" class="not_for_sale"></div>
    <div class="container-fluid" :class="modal.showModal">
      <div class="row">
        <div class="col-md-4">
          <img
            :src="volume.volumeInfo.imageLinks.smallThumbnail"
            :alt="card.imgAlt"
          />
        </div>
        <div class="col-md-8">
          <p class="text-primary small text-left">
            {{ volume.volumeInfo.description }}
          </p>
          <form>
            <div
              class="form-group text-left"
              :class="{
                'form-group--error': $v.modal.modalFormInput.name.$error
              }"
            >
              <label for="name" aria-label="Имя пользователя"
                >Имя пользователя:</label
              >
              <input
                class="form-control"
                type="text"
                id="name"
                name="name"
                placeholder="Введите ваше имя"
                v-model.trim="$v.modal.modalFormInput.name.$model"
                ref="name"
              />
              <div
                class="small error"
                v-if="$v.modal.modalFormInput.name.$error"
              >
                <template v-if="!$v.modal.modalFormInput.name.minLength">
                  Имя должно содержать минимум 2 символа
                </template>
                <template v-else> Поле обязательно для заполнения </template>
              </div>
            </div>

            <div
              class="form-group text-left"
              :class="{
                'form-group--error': $v.modal.modalFormInput.email.$error
              }"
            >
              <label for="email" aria-label="Ваш адрес электронной почты"
                >Email:</label
              >

              <input
                class="form-control"
                type="email"
                id="email"
                name="email"
                placeholder="someone@example.com"
                v-model.trim="$v.modal.modalFormInput.email.$model"
              />
              <div
                class="small error"
                v-if="$v.modal.modalFormInput.email.$error"
              >
                <template
                  v-if="!$v.modal.modalFormInput.email.checkValidityEmail"
                >
                  Введите корректный адрес электронной почты
                </template>
              </div>
            </div>

            <div
              class="form-group text-left"
              :class="{
                'form-group--error': $v.modal.modalFormInput.tel.$error
              }"
            >
              <label for="phone-number" aria-label="Ваш телефон"
                >Phone number:</label
              >

              <input
                class="form-control"
                type="tel"
                id="phone-number"
                name="phone-number"
                v-model.trim="$v.modal.modalFormInput.tel.$model"
              />
              <div
                class="small error"
                v-if="$v.modal.modalFormInput.tel.$error"
              >
                <template v-if="!$v.modal.modalFormInput.tel.checkValidityTel">
                  Введите номер в формате +380ххххххххх
                </template>
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-info"
              :disabled="$v.$invalid"
              @click.prevent="addProduct"
            >
              {{ modal.btnTitle }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../main";
import { required, minLength, helpers } from "vuelidate/lib/validators";

const checkValidityEmail = helpers.regex(
  "checkValidityEmail",
  /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/i
);

const checkValidityTel = helpers.regex(
  "checkValidityTel",
  /^\+380\d{3}\d{2}\d{2}\d{2}$/
);

export default {
  name: "Item",
  props: {
    volume: {
      type: Object
    }
  },
  data() {
    return {
      isActive: false,
      product: {},
      price: 0,
      notForSale: false,
      card: {
        imgAlt: "Изображение обложки тома",
        btnTitle: "Заказать"
      },
      modal: {
        btnTitle: "Отправить",
        modalFormInput: {
          name: null,
          tel: "+380",
          email: null
        },
        showModal: {
          popup: true,
          popup_open: false
        }
      }
    };
  },
  validations: {
    modal: {
      modalFormInput: {
        name: {
          required,
          minLength: minLength(2)
        },
        email: {
          checkValidityEmail
        },
        tel: {
          checkValidityTel
        }
      }
    }
  },
  methods: {
    openModal() {
      if (this.volume.saleInfo.saleability === "FOR_SALE") {
        if (this.modal.showModal.popup) {
          this.modal.showModal.popup_open = true;
          EventBus.$emit("clickModalButton");
          this.$nextTick(() => {
            this.$refs.name.focus();
          });
        }
      } else if (this.volume.saleInfo.saleability === "NOT_FOR_SALE") {
        this.notForSale = true;
      }
    },
    addProduct() {
      this.price = this.volume.saleInfo.listPrice.amount;
      EventBus.$emit("priceproduct", this.price);
      this.$store.commit("addProduct", this.volume);
      this.modal.showModal.popup_open = false;
    }
  },
  mounted() {
    EventBus.$on("closeModal", () => (this.modal.showModal.popup_open = false));
  }
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
    content: "NOT FOR SALE";
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

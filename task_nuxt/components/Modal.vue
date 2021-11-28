<template>
  <div class="modal__overlay">
    <div class="modal">
      <div>
        <img :src="src" :alt="alt" />
      </div>
      <div>
        <p class="text-primary small text-left">
          {{ text }}
        </p>
        <form>
          <div
            class="form-group text-left"
            :class="{
              'form-group--error': $v.modalFormInput.name.$error,
            }"
          >
            <label for="name" aria-label="Имя пользователя"
              >Имя пользователя:</label
            >
            <input
              id="name"
              ref="name"
              v-model.trim="$v.modalFormInput.name.$model"
              class="form-control"
              type="text"
              name="name"
              placeholder="Введите ваше имя"
            />
            <div v-if="$v.modalFormInput.name.$error" class="small error">
              <template v-if="!$v.modalFormInput.name.minLength">
                Имя должно содержать минимум 2 символа
              </template>
              <template v-else> Поле обязательно для заполнения </template>
            </div>
          </div>

          <div
            class="form-group text-left"
            :class="{
              'form-group--error': $v.modalFormInput.email.$error,
            }"
          >
            <label for="email" aria-label="Ваш адрес электронной почты"
              >Email:</label
            >

            <input
              id="email"
              v-model.trim="$v.modalFormInput.email.$model"
              class="form-control"
              type="email"
              name="email"
              placeholder="someone@example.com"
            />
            <div v-if="$v.modalFormInput.email.$error" class="small error">
              <template v-if="!$v.modalFormInput.email.validEmail">
                Введите корректный адрес электронной почты
              </template>
            </div>
          </div>

          <div
            class="form-group text-left"
            :class="{
              'form-group--error': $v.modalFormInput.tel.$error,
            }"
          >
            <label for="phone-number" aria-label="Ваш телефон"
              >Phone number:</label
            >

            <input
              id="phone-number"
              v-model.trim="$v.modalFormInput.tel.$model"
              class="form-control"
              type="tel"
              name="phone-number"
            />
            <div v-if="$v.modalFormInput.tel.$error" class="small error">
              <template v-if="!$v.modalFormInput.tel.validEmail">
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
            {{ btnTitle }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, helpers } from 'vuelidate/lib/validators';
import { EventBus } from './../plugins/EventBus';

const checkValidityEmail = helpers.regex(
  'checkValidityEmail',
  /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/i
);

const checkValidityTel = helpers.regex(
  'checkValidityTel',
  /^\+380\d{3}\d{2}\d{2}\d{2}$/
);

export default {
  name: 'Modal',

  data() {
    return {
      btnTitle: 'Отправить',
      text: 'description',
      src: 'url',
      alt: 'alt text',
      modalFormInput: {
        name: '',
        tel: '+380',
        email: '',
      },
    };
  },
  validations: {
    modalFormInput: {
      name: {
        required,
        minLength: minLength(2),
      },
      email: {
        checkValidityEmail,
      },
      tel: {
        checkValidityTel,
      },
    },
  },
  methods: {
    addProduct() {
      EventBus.$emit('closeModal');
    },
  },
  // mounted() {},
};
</script>

<style scoped lang="scss">
$color_blue_sky: #00b2ff;
$color_white_90: rgba(255, 255, 255, 0.9);
$color_white: rgb(255, 255, 255);
$color_shadow: rgba(4, 6, 6, 0.2);

.modal__overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  background: $color_white_90;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 15px;
  outline: 1px solid $color_blue_sky;
  background-color: $color_white;
  box-shadow: 0 10px 20px $color_shadow;
  transition: ease-out;
  animation-name: departure;
  animation-duration: 0.7s;
  will-change: transform;
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
</style>

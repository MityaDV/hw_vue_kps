<template>
  <div class="modal__overlay" :class="showModal">
    <div class="row">
      <div class="col-md-4">
        <img :src="item.volumeInfo.imageLinks.thumbnail" :alt="card.imgAlt" />
      </div>
      <div class="col-md-8">
        <p class="text-primary small text-left">
          {{ item.volumeInfo.description }}
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
      notForSale: false,
      btnTitle: 'Отправить',
      modalFormInput: {
        name: null,
        tel: '+380',
        email: null,
      },
      showModal: {
        popup: true,
        popup_open: false,
      },
    };
  },
  validations: {
    modal: {
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
  },
};
</script>

<style scoped></style>

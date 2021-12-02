<template>
  <v-container fluid class="modal__overlay">
    <v-card class="modal d-flex flex-wrap">
      <v-row class="flex-nowrap justify-center d-block d-sm-flex" no-gutters>
        <v-avatar tile height="153" min-width="100" class="mr-4">
          <v-img :src="item.src" :alt="alt" />
        </v-avatar>
        <v-card-text
          class="text-caption overflow-y-hidden pa-0"
          style="max-height: 200px"
        >
          {{ item.description }}
        </v-card-text>
      </v-row>
      <v-row class="justify-center" no-gutters>
        <v-form>
          <v-text-field
            v-model.trim="form.name"
            :error-messages="nameErrors"
            label="Name"
            required
            @input="$v.form.name.$touch()"
            @blur="$v.form.name.$touch()"
          >
          </v-text-field>
          <v-text-field
            v-model.trim="form.email"
            :error-messages="emailErrors"
            label="Email"
            required
            @input="$v.form.email.$touch()"
            @blur="$v.form.email.$touch()"
          >
          </v-text-field>
          <v-text-field
            v-model.trim="form.tel"
            :error-messages="phoneErrors"
            label="Phone number"
            required
            @input="$v.form.tel.$touch()"
            @blur="$v.form.tel.$touch()"
          >
          </v-text-field>

          <v-btn
            depressed
            color="primary"
            type="submit"
            :disabled="$v.$invalid"
            @click.prevent="addProduct"
          >
            {{ btnTitle }}
          </v-btn>
          <v-btn depressed color="primary" @click="clear"> Очистить </v-btn>
        </v-form>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { required, minLength, helpers, email } from 'vuelidate/lib/validators';
import { EventBus } from './../plugins/EventBus';

const checkValidityTel = helpers.regex(
  'checkValidityTel',
  /^\+380\d{3}\d{2}\d{2}\d{2}$/
);

export default {
  name: 'Modal',

  data() {
    return {
      btnTitle: 'Отправить',
      alt: 'Изображение обложки тома',
      item: {
        src: '',
        description: '',
      },
      form: {
        name: '',
        email: '',
        tel: '+380',
      },
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(2),
      },
      email: {
        required,
        email,
      },
      tel: {
        required,
        checkValidityTel,
      },
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.minLength &&
        errors.push('Имя должно содержать минимум 2 символа');
      !this.$v.form.name.required &&
        errors.push('Поле обязательно для заполнения');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.email &&
        errors.push('Введите корректный адрес электронной почты');
      !this.$v.form.email.required &&
        errors.push('Поле обязательно для заполнения');
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.form.tel.$dirty) return errors;
      !this.$v.form.tel.checkValidityTel &&
        errors.push('Введите номер в формате +380ххххххххх');
      !this.$v.form.tel.required &&
        errors.push('Поле обязательно для заполнения');
      return errors;
    },
  },
  mounted() {
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        EventBus.$emit('closeModal');
      }
    });
    EventBus.$on('openModal', (item) => {
      this.item.src = item.volumeInfo.imageLinks.thumbnail;
      this.item.description = item.volumeInfo.description;
    });
  },
  methods: {
    addProduct() {
      this.$v.$touch();
      EventBus.$emit('addProduct');
    },
    clear() {
      this.$v.form.$reset();
      this.form.name = '';
      this.form.email = '';
      this.form.tel = '+380';
    },
    closeModal() {
      EventBus.$emit('closeModal');
    },
  },
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

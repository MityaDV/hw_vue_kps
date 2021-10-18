<template>
  <v-row justify="center">
    <v-col>
      <v-form ref="form" v-model="form.valid" @submit.prevent>
        <v-text-field
          v-model.trim="form.searchText"
          type="text"
          solo
          :autofocus="form.autofocus"
          :clearable="form.clearable"
          :rules="form.searchRules"
          required
        >
        </v-text-field>
      </v-form>
    </v-col>
    <v-col>
      <nuxt-link to="/cart" class="d-block">
        <img src="/pngegg.png" alt="Изображение корзины" width="50px"
      /></nuxt-link>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        searchText: '',
        btnTitle: 'Отправить',
        autofocus: true,
        clearable: true,
        valid: true,
        searchRules: [(v) => !!v || 'Поле не должно быть пустым'],
      },
    }
  },
  methods: {},
}
</script>

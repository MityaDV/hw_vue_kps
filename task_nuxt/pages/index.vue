<template>
  <v-row justify="center" align="center">
    <v-col class="d-flex justify-center" cols="12" lg="12" md="6">
      <nuxt-link to="/cart">
        <v-img src="/pngegg.png" width="50px"></v-img>
      </nuxt-link>
      <v-card-text>
        <p>Текст заказа</p>
      </v-card-text>
    </v-col>
    <v-col cols="12" lg="6">
      <v-form class="d-flex justify-center flex-wrap">
        <v-text-field
          v-model.trim="form.searchText"
          style="flex-basis: 100%"
          type="text"
          solo
          :autofocus="form.autofocus"
          :clearable="form.clearable"
          required
        >
        </v-text-field>
        <nuxt-link to="_books" tag="button">
          {{ form.btnTitle }}
        </nuxt-link>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      form: {
        searchText: '',
        btnTitle: 'Отправить',
        autofocus: true,
        clearable: true,
      },
    }
  },
  methods: {},
}
</script>

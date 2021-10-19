<template>
  <v-row class="align-start">
    <v-col>
      <v-form class="d-flex justify-center flex-wrap">
        <v-text-field
          v-model.trim="form.searchText"
          style="flex-basis: 100%"
          type="text"
          solo
          :rules="form.rules"
          :autofocus="form.autofocus"
          :clearable="form.clearable"
          required
        >
        </v-text-field>
        <v-btn color="primary" elevation="3" @click="fetchBooks">
          {{ form.btnTitle }}
        </v-btn>
      </v-form>
    </v-col>
    <v-col class="d-flex">
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
      // url: process.env.baseURL,
      items: [],
      form: {
        searchText: '',
        btnTitle: 'Отправить',
        autofocus: true,
        clearable: true,
        rules: [(v) => !!v || 'Поле не должно быть пустым'],
      },
    }
  },

  methods: {
    fetchBooks() {
      const initItems = [1, 2, 3, 4, 5, 6, 7]
      this.items = []

      fetch(this.$config.baseURL + this.form.searchText, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((json) => {
          for (const i in initItems) {
            const it = json.items[i]
            this.items.push(it)
          }
        })
      this.form.searchText = ''
    },
  },
}
</script>

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
        <v-btn color="primary" elevation="3" @click="fetchBooks">
          {{ form.btnTitle }}
        </v-btn>
      </v-form>
    </v-col>

    <!-- {{ $store.state }} -->
  </v-row>
</template>

<script>
export default {
  name: 'HomePage',
  // layout: 'SearchBooks',
  data() {
    return {
      items: [],
      form: {
        searchText: '',
        btnTitle: 'Отправить',
        autofocus: true,
        clearable: true,
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

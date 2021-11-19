<template>
  <v-row justify="center">
    <v-col justify="center" align="center" cols="12" md="8">
      <h2>Search books</h2>
      <p>query for this page: {{ $route.query }}</p>
      <p>{{ responce }}</p>
      <nuxt-link to="/">Home</nuxt-link>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SearchBooksPage',
  asyncData({ env, app, query }) {
    return app.$axios.get(env.BASE_APP_URL + query).then((responce) => {
      return { responce }
    })
  },
  data() {
    return {
      // env: process.env.BASE_APP_URL,
    }
  },
}
</script>

<template>
  <v-row justify="center">
    <v-col justify="center" align="center" cols="12" md="8">
      <h2>Search books</h2>
      <p>query for this page: {{ $route.query }}</p>
      <p>env: {{ env }}</p>
      <nuxt-link to="/">Home</nuxt-link>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SearchBooksPage',
  data() {
    return {
      env: process.env.BASE_APP_URL,
    }
  },
}
</script>

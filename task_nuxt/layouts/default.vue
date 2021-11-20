<template>
  <v-app light>
    <v-app-bar fixed app>
      <v-spacer />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <cart />
        <search-form />
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import SearchForm from './../components/SearchForm'
import Cart from './../components/Cart'
export default {
  name: 'Default',
  components: {
    Cart,
    SearchForm,
  },
  data() {
    return {
      fixed: true,
      light: true,
      title: 'Google Search Books',
    }
  },
}
</script>

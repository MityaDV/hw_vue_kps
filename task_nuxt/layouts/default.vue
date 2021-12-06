<template>
  <v-app light>
    <v-app-bar fixed app>
      <v-spacer />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <info-cart></info-cart>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import InfoCart from '../components/InfoCart.vue';
export default {
  name: 'Default',
  components: {
    InfoCart,
  },

  data() {
    return {
      fixed: true,
      light: true,
      title: 'Google Search Books',
    };
  },
};
</script>

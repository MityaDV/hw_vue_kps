<template>
  <section>
    <info-cart></info-cart>
    <search-form></search-form>
  </section>
</template>

<script>
import InfoCart from '../components/InfoCart.vue';
import SearchForm from './../components/SearchForm.vue';

export default {
  name: 'HomePage',
  components: {
    SearchForm,
    InfoCart,
  },
  data() {
    return {};
  },
};
</script>

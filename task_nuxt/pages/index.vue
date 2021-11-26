<template>
  <section>
    <cart></cart>
    <search-form></search-form>
    <!-- <item-book></item-book> -->
  </section>
</template>

<script>
// import ItemBook from '../components/ItemBook.vue';
import Cart from './../components/Cart.vue';
import SearchForm from './../components/SearchForm.vue';

export default {
  name: 'HomePage',
  components: {
    SearchForm,
    Cart,
    // ItemBook,
  },
  data() {
    return {};
  },
};
</script>

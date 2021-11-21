<template>
  <v-row justify="center">
    <v-col justify="center" align="center" cols="12" md="8">
      <h2>Search books</h2>
      <item-books></item-books>
    </v-col>
  </v-row>
</template>

<script>
import ItemBooks from '../../components/ItemBooks.vue';
export default {
  name: 'SearchBooksPage',
  components: {
    ItemBooks,
  },
  data() {
    return {};
  },
  async fetch({ store, route }) {
    await store.dispatch('getItems', route.params.book);
  },
};
</script>

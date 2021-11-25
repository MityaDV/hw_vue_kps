<template>
  <v-row justify="center">
    <v-col justify="center" align="center" cols="12" md="8">
      <h2>Search books</h2>
      <item-books></item-books>
      <modal v-show="showModal"></modal>
    </v-col>
  </v-row>
</template>

<script>
import ItemBooks from '../../components/ItemBooks.vue';
import Modal from '../../components/Modal.vue';
import { EventBus } from './../../plugins/EventBus';

export default {
  name: 'SearchBooksPage',
  components: {
    ItemBooks,
    Modal,
  },

  data() {
    return {
      showModal: false,
    };
  },
  async fetch({ store, route }) {
    await store.dispatch('getItems', route.params.book);
  },
  mounted() {
    EventBus.$on('openModal', () => (this.showModal = true));
    EventBus.$on('closeModal', () => (this.showModal = false));
  },
};
</script>

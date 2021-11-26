<template>
  <v-row justify="center">
    <v-col justify="center" align="center" cols="12" md="8">
      <h2>Search books</h2>
      <item-book></item-book>
      <modal v-show="showModal"></modal>
    </v-col>
  </v-row>
</template>

<script>
import ItemBook from '../../components/ItemBook.vue';
import Modal from '../../components/Modal.vue';
import { EventBus } from './../../plugins/EventBus';

export default {
  name: 'SearchBooksPage',
  components: {
    ItemBook,
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

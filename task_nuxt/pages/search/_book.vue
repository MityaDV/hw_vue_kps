<template>
  <div class="d-flex flex-column align-center">
    <h3 class="text-h3 mb-4">Found Books</h3>
    <item-book></item-book>
    <modal v-show="showModal"></modal>
  </div>
</template>

<script>
import ItemBook from '../../components/ItemBook.vue';
import Modal from '../../components/Modal.vue';
import { EventBus } from '../../plugins/EventBus';

export default {
  name: 'BooksPage',
  components: {
    ItemBook,
    Modal,
  },

  data() {
    return {
      showModal: false,
    };
  },
  async fetch({ store, params }) {
    await store.dispatch('getItems', params.book);
  },
  mounted() {
    EventBus.$on('openModal', () => (this.showModal = true));
    EventBus.$on('closeModal', () => (this.showModal = false));
  },
};
</script>

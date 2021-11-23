<template>
  <div>
    <item-books></item-books>
    <!-- <div>
      <v-btn @click="showModal = true"></v-btn>
    </div> -->
    <modal></modal>
  </div>
</template>

<script>
import Modal from './../components/Modal.vue';
import ItemBooks from './../components/ItemBooks.vue';
// import { EventBus } from './../plugins/EventBus';

export default {
  name: 'HomePage',
  components: {
    ItemBooks,
    Modal,
  },
  data() {
    return {};
  },
};
</script>

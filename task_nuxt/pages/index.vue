<template>
  <div>
    <item-book></item-book>
    <!-- <div>
      <v-btn @click="showModal = true"></v-btn>
    </div> -->
    <!-- <modal></modal> -->
  </div>
</template>

<script>
// import Modal from './../components/Modal.vue';
import ItemBook from '../components/ItemBook.vue';
// import { EventBus } from './../plugins/EventBus';

export default {
  name: 'HomePage',
  components: {
    ItemBook,
    // Modal,
  },
  data() {
    return {};
  },
};
</script>

<template>
  <div>
    <h3 v-if="isActive">{{ title }}</h3>
  </div>
</template>

<script>
import { EventBus } from "../main";
export default {
  name: "Cart",
  data() {
    return {
      title: "Список заказанных товаров",
      isActive: true,
    };
  },
  created() {
    EventBus.$on("clearTitle", () => (this.isActive = false));
  },
};
</script>

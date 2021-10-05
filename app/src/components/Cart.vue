<template>
  <div>
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      title: "Список заказанных товаров",
    };
  },
  created() {
    console.log(this.$route);
  },
};
</script>

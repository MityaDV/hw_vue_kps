<template>
  <div id="app" class="container">
    <h2 class="text-primary">{{ title }}</h2>
    <SearchForm />
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue";

export default {
  name: "App",
  components: {
    SearchForm,
  },
  data() {
    return {
      title: "Google Search Books",
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

li {
  list-style: none;
}
</style>

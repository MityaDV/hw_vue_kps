<template>
  <div>
    <h2>{{ title }}</h2>
    <input type="text" />
    <label></label> <br />
    <button>{{ btnTitle }}</button>
  </div>
</template>

<script>
export default {
  name: "SearchForm",
  data() {
    return {
      title: "Search Form",
      btnTitle: "Отправить",
    };
  },
};
</script>

<template>
  <div>
    <div class="form">
      <div class="form__group">
        <input class="form__input" type="text" v-model.trim="form.text" />
      </div>
      <div class="cart"></div>
      <button class="btn" @click="fetchBooks">{{ form.btnTitle }}</button>
    </div>
    <Item :total="result.books" />
  </div>
</template>

<script>
import Item from "@/components/Item.vue";

export default {
  name: "Data",
  components: {
    Item,
  },
  data() {
    return {
      url: process.env.VUE_APP_URL,
      form: {
        text: "",
        btnTitle: "Отправить",
      },
      result: {
        books: {},
      },
    };
  },
  methods: {
    fetchBooks() {
      if (this.form.text == "") {
        alert("поле не может быть пустым");
        return;
      }
      fetch(this.url + this.form.text, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => (this.result.books = json));
      // this.form.text = "";
    },
  },
};
</script>

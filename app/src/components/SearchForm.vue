<template>
  <div>
    <div class="form" :style="style.form">
      <div class="form__group">
        <input class="form__input" type="text" v-model.trim="form.text" />
      </div>
      <div class="cart"></div>
      <button class="btn" @click="fetchBooks">{{ form.btnTitle }}</button>
    </div>
    <div class="block" :style="style.block">
      <Item v-for="item in result.items" :volume="item" :key="item.id" />
    </div>
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
        items: [],
      },
      style: {
        form: {
          margin: "0 0 10px",
          padding: 0,
        },
        block: {
          // display: "flex",
          // flexWrap: "wrap",
          // justifyContent: "space-around",
        },
      },
    };
  },

  methods: {
    fetchBooks() {
      let init_items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.result.items = [];

      if (this.form.text == "") {
        alert("поле не может быть пустым");
        return;
      }
      fetch(this.url + this.form.text, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
          for (const i in init_items) {
            const it = json.items[i];
            this.result.items.push(it);
          }
        });
      this.form.text = "";
      console.log(this.result.items);
    },
  },
};
</script>

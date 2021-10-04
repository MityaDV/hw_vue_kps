<template>
  <div>
    <div class="form">
      <div class="form__group">
        <input class="form__input" type="text" v-model.trim="form.text" />
        <div class="cart">
          <span class="cart__img"></span>
          <p>{{ cart.text }}</p>
        </div>
      </div>
      <button class="btn" @click="fetchBooks">{{ form.btnTitle }}</button>
    </div>
    <div class="block">
      <Item
        v-for="item in result.items"
        :volume="item"
        :key="item.id"
        @priceproduct="getPrice"
      />
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";

export default {
  name: "SearchForm",
  components: {
    Item,
  },
  data() {
    return {
      url: process.env.VUE_APP_URL,
      isActive: true,
      form: {
        text: "",
        btnTitle: "Отправить",
      },
      cart: {
        text: "",
      },
      result: {
        items: [],
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
    getPrice(obj) {
      this.cart.text = `Добавлено ${obj.count} товаров на сумму ${obj.sum} гривен.`;
    },
  },
};
</script>

<style lang="scss">
.form {
  margin: 0 0 10px;
  padding: 0;
}
.cart__img {
  background-image: url("../assets/images/pngegg.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: 50px;
  height: 50px;
  display: flex;
}
.form__group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.form__input {
  margin-right: 20px;
}
.cart {
  display: flex;
  flex-wrap: wrap;
}
.btn {
  width: 100px;
}
</style>

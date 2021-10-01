<template>
  <div>
    <div class="card">
      <ul class="card__list" v-for="(item, index) in items" :key="index">
        <li class="card__item">
          <img :src="item.volumeInfo.imageLinks.smallThumbnail" alt="" />
        </li>
        <li class="card__item">
          <span>{{ item.volumeInfo.title }}</span>
        </li>
        <li
          class="card__item"
          v-for="(autor, index) in item.volumeInfo.authors"
          :key="index"
        >
          <span>{{ autor }}</span>
        </li>
        <li class="card__item">
          <span>
            {{ item.volumeInfo.publishedDate }}
          </span>
        </li>
      </ul>
      <button class="card__btn">Заказать</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    total: {
      type: Object,
    },
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    getItems() {
      this.items = [];
      for (const i in this.total.items) {
        const id = this.total.items[i];
        this.items.push(id);
      }
    },
    // changeDate() {

    //     let eu = date.volumeInfo.publishedDate;
    //     eu = eu.spplit("-");
    //     let us = eu.reverse().join(".");
    //     return us;

    // },
  },
  computed: {
    // data() {
    //   return this.getItems();
    // },
  },
};
</script>

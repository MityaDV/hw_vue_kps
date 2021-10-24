<template>
  <div>
    <div class="wrapper">
      <div class="form col-md-4">
        <div class="form-group">
          <input
            class="form-control"
            type="text"
            v-model.trim="searchText"
            @keyup.enter="fetchBooks"
          />
        </div>
        <button class="btn btn-primary" @click="fetchBooks">
          {{ btnFormTitle }}
        </button>
      </div>
    </div>

    <Item v-for="item in items" :volume="item" :key="item.id" />
  </div>
</template>

<script>
import Item from "@/components/Item.vue";
import { mapGetters } from "vuex";

export default {
  name: "SearchForm",
  components: {
    Item,
  },
  data() {
    return {
      url: process.env.VUE_APP_URL,
      searchText: "",
      btnFormTitle: "Отправить",
    };
  },
  watch: {
    $route: function () {
      this.$store.commit("cleanItems");
      this.$store.commit("cleanProducts");
    },
  },
  computed: {
    ...mapGetters({
      items: "getItems",
    }),
  },
  methods: {
    fetchBooks() {
      this.$store.dispatch("getItems", this.url + this.searchText);
      this.searchText = "";
    },
  },
};
</script>

<style lang="scss">
$color_success: #02c232;

.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 15px;
  // margin: 0 0 15px calc(100% - (100% - 25%));
}

.success {
  min-width: 300px;
  min-height: 300px;
  background-color: rgb(250, 250, 250);
  box-shadow: 0 10px 20px rgba(4, 6, 6, 0.2);
  outline: 1px solid $color_success;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
</style>

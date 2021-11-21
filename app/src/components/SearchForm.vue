<template>
  <div class="wrapper">
    <div class="form">
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

    <div class="wrapper__item">
      <Item v-for="item in items" :volume="item" :key="item.id" />
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";
import { mapGetters } from "vuex";

export default {
  name: "SearchForm",
  components: {
    Item
  },
  data() {
    return {
      url: process.env.VUE_APP_URL,
      searchText: "",
      btnFormTitle: "Отправить"
    };
  },
  watch: {
    $route: function() {
      this.$store.commit("cleanItems");
      this.$store.commit("cleanProducts");
    }
  },
  computed: {
    ...mapGetters({
      items: "getItems"
    })
  },
  methods: {
    fetchBooks() {
      this.$store.dispatch("getItems", this.url + this.searchText);
      this.searchText = "";
    }
  }
};
</script>

<style lang="scss">
$color_success: #02c232;
.wrapper {
  display: flex;
  flex-flow: wrap;
  justify-content: center;
}

.form {
  flex: 0 1 50%;
  margin-bottom: 15px;
}

.wrapper__item {
  display: flex;
  flex-flow: column;
  flex: 100%;
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

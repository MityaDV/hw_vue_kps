<template>
  <v-row justify="center" align="center">
    <v-col cols="12" lg="6">
      <v-form class="d-flex justify-center flex-wrap" @submit.prevent="addPath">
        <v-text-field
          v-model.trim="searchText"
          style="flex-basis: 100%"
          type="text"
          solo
          :autofocus="autofocus"
          :clearable="clearable"
        >
        </v-text-field>
        <v-btn depressed color="primary" type="submit">
          {{ btnTitle }}
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      searchText: '',
      btnTitle: 'Отправить',
      autofocus: true,
      clearable: true,
      isSuccess: false,
    };
  },

  methods: {
    addPath() {
      this.$router.push(`/search/${this.searchText}`);
      this.searchText = '';
    },
  },
};
</script>

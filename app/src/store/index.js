import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
  },
  getters: {
    getItems(state) {
      return state.items;
    },
  },
  mutations: {
    addItems(state, payload) {
      state.items.push(...payload);
    },
    cleanItems(state) {
      state.items = [];
    },
  },
  actions: {
    getItems({ commit }, url) {
      commit("cleanItems");
      const items = [];
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          for (const i in json.items) {
            const it = json.items[i];
            items.push(it);
          }
          commit("addItems", items);
        });
    },
  },
  modules: {},
});

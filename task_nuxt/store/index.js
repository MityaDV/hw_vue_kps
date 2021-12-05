export const state = () => ({
  items: [],
  products: [],
  searchText: '',
});

export const getters = {
  getItems(state) {
    return state.items;
  },
  getProducts(state) {
    return state.products;
  },
  getProductsCount(state) {
    return state.products.length;
  },
};

export const mutations = {
  addSearchText(state, searchText) {
    state.searchText = searchText;
  },
  addItems(state, payload) {
    state.items = payload.items;
  },
  cleanItems(state) {
    state.items = [];
  },
  addProduct(state, product) {
    state.products.push(product);
  },
  cleanProducts(state) {
    state.products = [];
  },
};

export const actions = {
  async getItems({ commit, state }, searchText) {
    if (searchText !== undefined) {
      commit('addSearchText', searchText);
    }
    const { data } = await this.$axios.get(
      process.env.BASE_APP_URL + state.searchText
    );
    commit('addItems', data);
  },
};

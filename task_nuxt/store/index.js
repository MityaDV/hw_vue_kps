export const state = () => ({
  items: [],
  products: [],
  searchText: '',
  total: 0,
});

export const mutations = {
  addSearchText(state, searchText) {
    state.searchText = searchText;
  },
  addItems(state, payload) {
    state.items = payload.items;
  },
  addProduct(state, product) {
    state.products.push(product);
    state.total += +product.saleInfo.listPrice.amount.toFixed(2);
  },
  cleanItems(state) {
    state.items = [];
  },
  cleanState(state) {
    state.items = [];
    state.products = [];
    state.searchText = '';
    state.total = 0;
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
  getTotal(state) {
    return state.total;
  },
};

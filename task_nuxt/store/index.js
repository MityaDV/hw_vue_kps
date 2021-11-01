export const state = () => ({
  items: [],
  products: [],
})

export const getters = {
  getItems(state) {
    return state.items
  },
  getProducts(state) {
    return state.products
  },
}

export const mutations = {
  addItems(state, payload) {
    state.items.push(...payload)
  },
  cleanItems(state) {
    state.items = []
  },
  addProduct(state, product) {
    state.products.push(product)
  },
  cleanProducts(state) {
    state.products = []
  },
}

export const actions = {}

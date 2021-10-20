export const state = () => ({
  items: [],
})

export const mutations = {
  takeItems(state, payload) {
    state.items.push(...payload)
  },
  cleanItems(state) {
    state.items = []
  },
}

export const actions = {
  getItems({ commit }, items) {
    commit('takeItems', items)
  },
}

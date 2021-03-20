import { make } from 'vuex-pathify'

export const state = () => ({
  transactions: [],
})

export const getters = {
  ...make.getters(state),
}

export const mutations = {
  ...make.mutations(state),
}

export const actions = {
  ...make.actions(state),
  async getList({ commit }, payload) {
    const { data: trans } = await this.$models('transaction/getList', payload)
    commit('SET_TRANSACTIONS', trans.data)
  },
}

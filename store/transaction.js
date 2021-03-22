import { make } from 'vuex-pathify'

export const state = () => ({
  transactions: {},
  filters: {
    eid: null,
    status: 'PROCESSING',
    startDate: '',
    endDate: '',
  },
})

export const getters = {
  ...make.getters(state),
}

export const mutations = {
  ...make.mutations(state),
  SET_LAZY_LOADING_TRANSACTION(state, payload) {
    state.transactions.meta = payload.meta
    state.transactions.trans = [...state.transactions.trans, ...payload.trans]
  },
  UPDATE_TRANSACTIONS(state, payload) {
    const transactions = state.transactions.trans.map((tran) => {
      if (payload.tranId === tran.id) tran.status = payload.status

      return tran
    })

    state.transactions = {
      ...state.transactions,
      ...{
        trans: transactions,
      },
    }
  },
}

export const actions = {
  setFilters({ commit }, filters) {
    commit('SET_FILTERS', filters)
  },
  async lazyLoadingList({ commit }, payload) {
    const { data: trans } = await this.$models('transaction/getList', payload)
    commit('SET_LAZY_LOADING_TRANSACTION', trans.data)
  },
  async getList({ commit }, payload) {
    commit('SET_TRANSACTIONS', {})
    const options = {}
    if (payload.startDate) {
      options.startDate = payload.startDate.replaceAll('/', '-')
    }
    if (payload.endDate) {
      options.endDate = payload.endDate.replaceAll('/', '-')
    }
    const { data: trans } = await this.$models('transaction/getList', { ...payload, ...options })
    commit('SET_TRANSACTIONS', trans.data)
  },
  async confirmReceived({ commit }, payload) {
    const { data: received } = await this.$models('transaction/confirmReceived', payload)
    if (received.success)
      commit('UPDATE_TRANSACTIONS', {
        tranId: payload.tranId,
        status: 'RECEIVED',
      })
    return received
  },
  async cancel({ commit }, payload) {
    const { data: canceled } = await this.$models('transaction/updateCancel', payload)
    if (canceled.success)
      commit('UPDATE_TRANSACTIONS', {
        tranId: payload.tranId,
        status: 'CANCEL',
      })
    return canceled
  },
}

import pathify from 'vuex-pathify'
import createPersistedState from 'vuex-persistedstate'

export const plugins = [pathify.plugin, createPersistedState()]

import Vue from 'vue'
import Vuex from 'vuex'

import { SET_USERNAME } from './contants'

Vue.use(Vuex)

const state = {
  userName: '张三'
}

const getters = {
  curUserName: (state) => {
    return state.userName
  }
}

const mutations = {
  [SET_USERNAME](state, name) {
    state.userName = name
  }
}

const actions = {}

export default new Vuex.Store({
  modules: {},
  state,
  getters,
  mutations,
  actions
})

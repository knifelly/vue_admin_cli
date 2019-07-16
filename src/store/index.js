import Vue from 'vue'
import Vuex from 'vuex'

import { 
  SET_COLLAPSE,
  SET_TAGSLIST,
  SET_USERNAME 
} from './contants'

Vue.use(Vuex)

const state = {
  collapse: false,  // 是否收起左侧栏
  tagsList:[],       // 顶部标签列表
  userName:'',      // 用户名
}

const getters = {
  curUserName: (state) => {
    return state.userName
  }
}

const mutations = {
  [SET_COLLAPSE](state, collapse) {
    state.collapse = collapse
  },
  [SET_TAGSLIST](state, tagsList) {
    state.tagsList = tagsList
  },
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

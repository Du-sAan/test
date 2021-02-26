import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import mutations from "./mutation"
import actions from "./actions"
import getters from "./getters"
import moduleA from "./modules/moduleA"

const state = {
  GoodList : [],
  settlement : []
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules :{
    moduleA
  },
})

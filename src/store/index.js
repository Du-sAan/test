import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import mutations from "./mutation"
import actions from "./actions"
import getters from "./getters"
import moduleA from "./modules/moduleA"

const state = {
  count : 1
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

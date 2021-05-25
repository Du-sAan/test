import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import mutations from "./mutation"
import actions from "./actions"
import getters from "./getters"
import moduleA from "./modules/moduleA"

const state = {
  GoodList : [],
  settlement : [],
  // 登录状态
  loginStatus : false,
  username : "",
  // 用户有
  userInfo : {},
  recommend : new Set(),
  // 收藏列表
  collectionList : []
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

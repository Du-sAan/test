export default {
  addGoodCount(state, params) {
    // 增加相同商品的数量
    state.GoodList.forEach(item => {
      if (item.iid === params.iid) {
        item.count++
      }
    })
  },
  addGood(state, params) {
    // 增加新的商品
    state.GoodList.push(params)
  },
  buyGood(state, params) {
    state.GoodList.push(params)
  },
  clearGoodList(state) {
    state.GoodList = [];
  },
  login(state, params) {
    // 改变用户登录状态
    state.loginStatus = params.status;
    state.username = params.username
    // 将用户信息存入状态管理
    state.userInfo = params.info
  },
  loginOut(state) {
    state.loginStatus = false;
    state.username = ""
    // 将用户信息存入状态管理
    state.userInfo = []
  },
  collection(state, params) {
    state.collectionList.push(params)
  },
  cancelCollection(state, params){
    state.collectionList
  }
}
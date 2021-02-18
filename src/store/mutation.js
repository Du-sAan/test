export default {
  addGoodCount(state, params) {
    // 增加相同商品的数量
    params.count++
  },
  addGood(state, params) {
    // 增加新的商品
    state.GoodList.push(params)
  }
}
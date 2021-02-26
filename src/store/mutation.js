export default {
  addGoodCount(state, params) {
    // 增加相同商品的数量
    state.GoodList.forEach( item => {
      if(item.iid === params.iid){
        item.count++
      }
    })
    console.log(state.GoodList)
  },
  addGood(state, params) {
    // 增加新的商品
    state.GoodList.push(params)
  },
  buyGood(state, params){
    state.GoodList.push(params)
  },
  clearGoodList(state){
    state.GoodList = [];
  }
}
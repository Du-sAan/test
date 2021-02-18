export default {
  addGood(context, params) {
    // 1.查看是否添加过
    let oldInfo = context.state.GoodList.find(item => item.iid === params.iid)

    // 2.若持续添加，则将件数+1
    if (oldInfo) {
      
      context.commit("addGoodCount",oldInfo)
    } else {
      params.count = 1
      params.checked = true
      context.commit("addGood",params)
    }
  }
}
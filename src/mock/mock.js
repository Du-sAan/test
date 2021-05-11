import Mock from "mockjs"
// 生成随机的验证码
const BASE_URL = "http://106.54.54.237:8000/api/mn";
// /home/multidata
import HomeMultidata from "./HomeMultidata"
Mock.mock(BASE_URL + '/home/multidata', "get", (options) => {
  return HomeMultidata
})
// /home/data
import homeGoods from "./getHomeGoods"
Mock.mock(RegExp(BASE_URL + '/home/data' + '.*'), "get", (options) => {
  return {
    new : {
      list : homeGoods
    },
    pop : {
      list : homeGoods
    },
    sell : {
      list : homeGoods
    }
  }
})

//detail/data
import datailData from "./detailData"
Mock.mock(RegExp(BASE_URL + '/detail' + '.*'), "get", (options) => {
  return datailData
})

Mock.mock(RegExp(BASE_URL + '/recommend'),"get", (options) => {
  return {
    data : {
      list : homeGoods
    }
  }
})
// 验证码虚拟数据
Mock.mock(BASE_URL + '/profile/sign/getCode' , 'get', (options) => {
  console.log("mock拦截")
  return {
    checkCode: `${parseInt(Math.random() * 1000000)}`
  }
})
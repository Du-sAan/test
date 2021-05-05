// 封装所有有关首页的网络请求
import {request} from "./request"

// 封装home头部,轮播图的的网络请求
export function getHomeMultidata(){
  return request({
    url : "/home/multidata",
  })
}

export function getHomeGoods(type,page){
  return request({
    url : "/home/data",
    params :{
      type : type,
      page : page
    }
  })
}

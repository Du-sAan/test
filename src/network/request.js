import axios from "axios"

export function request(config){
  // 1.生成axios的实例
  const instance = axios.create({
    baseURL : "http://106.54.54.237:8000/api/mn",
    timeout : 5000
  })
  // 2.实例的拦截器
  instance.interceptors.request.use(config => {
    return  config
    // 这里的拦截失败，可能是网络等原因
  },err => {
    console.log(err)
  })

  // 2.1实例的响应拦截
  instance.interceptors.response.use(results => {
    return results.data
  }, err => {
    console.log(err)
  })
  // 3.发送网络请求
  return instance(config)
}
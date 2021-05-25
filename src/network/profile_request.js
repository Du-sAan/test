import { request } from "./request"
import axios from "axios"
// 获取用户信息的接口
function getUserInfo(data) {
  return request({
    url: "/profile/sign/userInfo",
    method: "get"
  })
}

// 获取验证码的接口
function getCode() {
  return request({
    url: "/profile/sign/getCode",
    method: "get"
  })
}

// 登录接口，验证用户信息接口(用户名密码登录)
function signinByPasswd(info) {
  console.log(axios.post)
}

// 注册用户
function register(data) {
  return axios.post("http://127.0.0.1:9999/register", {
    data: JSON.stringify(data)
  })
}
// 登录接口，验证用户信息接口(验证码登录)
function signinByCode(info) {
  return request({
    url: "/profile/sign/signinByCode",
    method: "post",
    body: info
  })
}
function signln(info) {
  return axios.post("http://127.0.0.1:9999/signln", {
    data: JSON.stringify(info)
  })
}
let p = register({
  username : "hm",
  phone : "15228551217",
  passwd : "123456",
  email: "dasdad@qq.com"
})

export default {
  getUserInfo,
  getCode,
  signinByPasswd,
  signinByCode,
  register,
  signln
}
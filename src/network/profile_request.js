import {request} from "./request"

// 获取用户信息的接口
export function getUserInfo(){
  return request({
    url : "/profile/sign/userInfo",
    method : "get"
  })
}

// 获取验证码的接口
export function getCode(){
  return request({
    url : "/profile/sign/getCode",
    method : "get"
  })
}


// 登录接口，验证用户信息接口(用户名密码登录)
export function signinByPasswd(info){
  return request({
    url : "/profile/sign/signinByPasswd",
    method : "post",
    body : info
  })
}

// 登录接口，验证用户信息接口(验证码登录)
export function signinByCode(info){
  return request({
    url : "/profile/sign/signinByCode",
    method : "post",
    body : info
  })
}
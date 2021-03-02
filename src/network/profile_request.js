import {request} from "./request"

export function getUserInfo(){
  return request({
    url : "/profile/sign/userInfo",
    method : "get"
  })
}

export function getCode(){
  return request({
    url : "/profile/sign/getCode",
    method : "get"
  })
}
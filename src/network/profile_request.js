import {request} from "./request"

export function getUserInfo(){
  return request({
    url : "/profile/sign/userInfo",
    method : "post"
  })
}

export function getCode(){
  return request({
    url : "/profile/sign/getCode",
    method : "post"
  })
}
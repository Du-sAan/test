import Mock from "mockjs"
// 生成随机的验证码
const BASE_URL = "http://106.54.54.237:8000/api/mn"
let checkCode = Mock.mock({
  'checkCode': `${parseInt(Math.random() * 1000000)}`
})
// 生成随机的用户
const userInfo = Mock.mock({
  // 生成8个用户
  "userList|8": [
    {
      name: "@cname(3)",
      idCard: "@id(18)",
      // true加上会有省份
      address: "@city(true)",
      birthday: '@date(yyyy-MM-dd) hh:dd:ss'
    }
  ]
})

let ran = Mock.mock({
  'number|8' : '@number'
})
Mock.mock(BASE_URL + '/profile/sign/getCode', 'get', (options) => {
  return {
    checkCode: `${parseInt(Math.random() * 1000000)}`
  }
})
console.log(userInfo)
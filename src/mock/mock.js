import Mock from "mockjs"
Mock.mock('/profile/sign/getCode', "post", (options) => {
  // 生成随机数验证码
  console.log(options)
  let code = Math.random() * 1000000
  return {
    code: `${code}`
  }
})
Mock.setup({
  timeout : 4000
})
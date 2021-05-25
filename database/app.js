const express = require("express");
const app = new express();
// express的请求体中间件，获取请求报文请求体
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const data_control = require("./data_control/index");

const port = 9999;
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  next();
});
// 登录操作
app.post("/signln", (request, response) => {
  console.log("收到登录请求")
  let data = JSON.parse(request.body.data)
  let isSignln = data_control.query(data)
  isSignln.then(res => {
    console.log(request.body.data, "*****", res)
    if (res.passwd === data.passwd) {
      response.send({
        isSignln: true,
        info: res
      })
    } else {
      response.send({
        isSignln: false
      })
    }
  })
})
app.get("/test", (req, res) => {
  res.send("正常")
})
// 注册操作
app.post("/register", (request, response) => {
  const user = {
    phone: JSON.parse(request.body.data).phone,
    info: JSON.parse(request.body.data)
  }
  // 查询用户是否存在，以手机号为标识
  let isRegistered = data_control.query(user)
  console.log('isRegistered', isRegistered)
  isRegistered.then(
    res => {
      // 若该用户不存在,则创建用户
      if (!res) {
        console.log("用户不存在")
        data_control.create(user)
        response.send({
          isRegistered: false,
          message: "注册成功"
        })
      }
      else {
        response.send({
          isRegistered: true,
          message: "该用户已存在"
        })
      }
    })
})
app.listen(port, () => {
  console.log(`服务启动,http://localhost:${port}`)
})
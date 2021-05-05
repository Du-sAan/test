import Mock from "mockjs";
let homeData = []
for (let i = 0; i < 30; i++) {
  let result = Mock.mock({
    image: "@image('320x600', '#50B347', '#FFF', 'jpg', '商品')",
    title: "商品",
    link: "javascript:;",
    "acm|32": "",
    "price|1-100.2": 1,
    "cfav|1-100" : 1,
    "iid|7" : ""
  })
  homeData[i] = result
}

export default homeData
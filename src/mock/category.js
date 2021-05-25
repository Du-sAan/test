import Mock from "mockjs"
let list = []
for (let i = 0; i < 30; i++) {
  let result = Mock.mock({
    image: "@image('65x65', '#50B347', '#FFF', 'jpg', '商品')",
    title: "商品分类",
    link: "javascript:;",
  })
  list[i] = result
}

let goods = []
for (let i = 0; i < 30; i++) {
  let result = Mock.mock({
    image: "@image('320x600', '#50B347', '#FFF', 'jpg', '商品')",
    title: "商品",
    link: "javascript:;",
    // 标识码
    "acm|32": "",
    // 价格
    "price|1-100.2": 1,
    // 收藏数
    "cfav|1-100" : 1,
    // id
    "iid|7" : ""
  })
  goods[i] = result
}
export default {
  list,
  goods
}
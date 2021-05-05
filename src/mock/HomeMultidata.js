import Mock from "mockjs"
function mockData(count, arr) {
  for (let i = 0; i < count; i++) {
    let result = Mock.mock({
      image: "@image('750x390', '#50B347', '#FFF', 'jpg', '轮播图')",
      title: "毕业设计",
      link: "javascript:;",
      "acm|32": ""
    })
    arr[i] = result
  }
}
// home中的数据生成
// 1.轮播图的数据
let home_banners = []
mockData(4, home_banners)

// 2.推荐列表的数据
let home_recommend = []
for (let i = 0; i < 4; i++) {
  let result = Mock.mock({
    image: "@image('225x255', '#50B347', '#FFF', 'jpg', '轮播图')",
    title: "毕业设计",
    link: "javascript:;",
    "acm|32": ""
  })
  home_recommend[i] = result
}

export default {
  home_banners,
  home_recommend
}
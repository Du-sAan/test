import Mock from "mockjs"
// 轮播图
const topImg = []
for (let i = 0; i < 4; i++) {
  let result = Mock.mock({
    image: "@image('375x200', '#50B347', '#FFF', 'jpg', '轮播图')",
    title: "毕业设计",
    link: "javascript:;",
    "acm|32": ""
  })
  topImg[i] = result.image
}

const itemInfo = {
  topImages: topImg,
  title: "这里是关于商品信息的具体描述文本，用mockjs生成的",
  discountDesc: "促销价",
  price: "¥25.8",
  desc : "商品描述信息在这里，用mockjs生成的"
}
const columns = ["销量 3887", "收藏76人", "默认快递"]
const shopInfo = {
  cGoods: 300,
  cSells: 63236,
  name: "mock店铺",
  score: [
    {
      isBetter: false,
      name: "描述相符",
      score: 4.58
    },
    {
      isBetter: true,
      name: "价格合理",
      score: 5
    },
    {
      isBetter: false,
      name: "质量满意",
      score: 4.58
    }
  ],
  services: [
    {
      icon: "//s11.mogucdn.com/p1/160607/upload_ie4tkmbtgqztomjqhezdambqgqyde_44x44.png",
      name: "退货补运费"
    },
    {
      icon: "//s11.mogucdn.com/p1/160607/upload_ie4tkmbtgqztomjqhezdambqgqyde_44x44.png",
      name: "全国包邮"
    },
    {
      icon: "//s11.mogucdn.com/p1/160607/upload_ie4tkmbtgqztomjqhezdambqgqyde_44x44.png",
      name: "7天无理由退货"
    },
    {
      icon: "//s11.mogucdn.com/p1/160607/upload_ie4tkmbtgqztomjqhezdambqgqyde_44x44.png",
      name: "72小时发货"
    }
  ],
  
}
// 商品参数
const itemParams = {
  info: {
    anchor: "product_info",
    key: "产品参数",
    set: [
      {
        key: "mockjs生成key,如保质期等",
        value: "mockjs生成的关于商品信息的描述信息"
      }, {
        key: "尺码",
        value: '"S", "M", "L", "XL"'
      }, {
        key: "保质期",
        value: "1年"
      }, {
        key: "生产日期",
        value: "2021-3-25"
      }, {
        key: "保修",
        value: "三年"
      }, {
        key: "生产许可证",
        value: "asdasdaw1312dasdads"
      }, {
        key: "mockjs生成key,如保质期等",
        value: "描述信息"
      }, {
        key: "mockjs生成key,如保质期等",
        value: "描述信息"
      }, {
        key: "mockjs生成key,如保质期等",
        value: "描述信息"
      }, {
        key: "mockjs生成key,如保质期等",
        value: "描述信息"
      }, {
        key: "mockjs生成key,如保质期等",
        value: "描述信息"
      }, {
        key: "mockjs生成key,如保质期等",
        value: "描述信息"
      }, {
        key: "mockjs生成key,如保质期等",
        value: "描述信息"
      },
    ]
  },
  rule: {
    anchor: "size_info",
    desc: "※ 以上尺寸为实物人工测量，因测量当时不同会有1-2cm误差，相关数据仅作参考，以收到实物为准.",
    disclaimer: "※ 以上尺寸为实物人工测量，因测量当时不同会有1-2cm误差，相关数据仅作参考，以收到实物为准。",
    key: "尺码说明",
    tables: [
      ["尺码", "S", "M", "L", "XL"],
      ["档长", "-", "-", "-", "-"],
      ["大腿围", "-", "-", "-", "-"],
      ["胸围", "114", "118", "122", "126"],
      ["腰围", "60-74", "64-78", "68-82", "72-86"],
      ["臀围", "-", "-", "-", "-"],
      ["裙长", "-", "-", "-", "-"],
      ["袖长", "46", "47", "48", "49"],
      ["裤长", "82", "83", "84", "85"],
      ["肩宽", "58", "59", "60", "61"],
      ["领围", "-", "-", "-", "-"],
      ["衣长", "60", "61", "62", "63"],
      ["裤口", "-", "-", "-", "-"],
    ]
  }
}
// 用户评论
const rate = {
  list: [
    {
      content: "质量非常不错。款式新颖，好喜欢，物流也很快。卖家服务非常好，值得购买",
      style: "颜色:白色 尺码:XL ",
      user: {
        avatar: "../assets/img/profile/avatar.jpeg",
        uname: "四川大学锦江学院",
      }
    }
  ],
}

const promotions = {
  link: "mls://shoppro?shopId=1172uw4c",
  list: ["满2件减5元", "满3件减10元", "满4件减15元", "满5件减20元"]
}
const detailInfo = {
  desc: "mock-关于商品的描述~~",
  detailImage: [
    {
      anchor: "model_img",
      desc: "",
      key: "穿着效果",
      list: topImg
    }
  ]
}
let homeData = []
for (let i = 0; i < 30; i++) {
  let result = Mock.mock({
    image: "@image('320x600', '#50B347', '#FFF', 'jpg', '商品')",
    title: "商品",
    link: "javascript:;",
    "acm|32": "",
    "price|1-100.2": 1,
    "cfav|1-100": 1,
    "iid|7": ""
  })
  homeData[i] = result
}
export default {
  result: {
    columns,
    itemInfo,
    shopInfo,
    itemParams,
    promotions,
    rate,
    homeData
  }
}
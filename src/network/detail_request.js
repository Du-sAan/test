import { request } from "./request";
export function getDetailData(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.realPrice = itemInfo.realPrice;
    this.columns = columns;
    this.services = services;
  }
}
// 商品参数
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

// 店铺参数
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

// 推荐商品
export function getRecommend(){
  return request({
    url : '/recommend'
  })
}
// let p = getDetailData()
// p.then(console.log,console.log)
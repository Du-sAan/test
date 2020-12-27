<template>
  <div id="detail">
    <deta-nar-bar />
    <bscroll ref="bscroll">
      <detail-swiper :topImgs="topImgs" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailGoodslInfo="detailGoodslInfo" @imagesLoad="imagesLoad" />
      <detail-param-info :paramInfo="paramInfo" />
      <detail-comment-info :commentInfo="commentInfo"/>
    </bscroll>
  </div>
</template>

<script>
import DetaNarBar from "./childComps/DetaNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"
import Bscroll from "components/common/bscroll/Bscroll";

import {
  getDetailData,
  Goods,
  Shop,
  GoodsParam
} from "network/detail_request.js";

export default {
  name: "Detail",
  components: {
    DetaNarBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Bscroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo
  },
  data() {
    return {
      iid: "",
      topImgs: [],
      goods: {},
      shop: {},
      detailGoodslInfo: {},
      paramInfo: {},
      commentInfo: {}
    };
  },
  created() {
    this.iid = this.$route.query.iid;
    this.getDetailData();
  },
  activated() {
    // this.iid = this.$route.query.iid
    // this.getDetailData()
  },
  methods: {
    getDetailData() {
      getDetailData(this.iid).then(res => {
        const data = res.result;
        // 1.保存轮播图的数据
        this.topImgs = res.result.itemInfo.topImages;

        // 将请求的数据封装到一个对象内
        // 2.封装需要的商品的详细信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );

        // 3.店铺信息对象的封装
        this.shop = new Shop(data.shopInfo);

        // 4.商品详细信息的保存
        this.detailGoodslInfo = data.detailInfo;

        // 5.商品参数信息的保存
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );

        // 商品评论信息的保存
        // 若评论为不为空
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
        console.log(this.commentInfo);
      });
    },
    imagesLoad() {
      this.$refs.bscroll.refresh();
    }
  }
};
</script>

<style scoped>
#detail {
  /* padding-top: 44px; */
  position: relative;
  z-index: 10;
  background-color: white;
  height: 100vh;
}
.nav-bar {
  position: static;
  position: relative;
  z-index: 10;
  background-color: white;
}
.wrapper {
  height: calc(100% - 93px);
}
</style>
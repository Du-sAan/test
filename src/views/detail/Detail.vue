<template>
  <div id="detail">
    <deta-nav-bar :iid="iid" @routeJump="switchRoute" />
    <!-- better-scroll
      是否实时监听
      是否触发触底事件
      滚动事件
    -->
    <bscroll 
      :probe-type="3" 
      :pullUpLoad="true" 
      ref="bscroll" 
      @contentScroll="contentScroll
    ">
      <!-- 子路由 -->
      <keep-alive>
        <router-view
          :topImgs="topImgs"
          :goods="goods"
          :shop="shop"
          :detailGoodslInfo="detailGoodslInfo"
          :paramInfo="paramInfo"
          :commentInfo="commentInfo"
          :good="recommendList"
        />
      </keep-alive>
    </bscroll>
    <!-- 回到顶部按钮 -->
    <back-top 
      @click.native="backTop" 
      v-show="isShowBackTop" 
    />
    <!-- 底部工具栏 -->
    <detail-bottom-bar 
      @addGood="addGood" 
      @collection="collection"
      @buyGood="buyGood" 
      ref="bottomBar" 
    />
    <!-- 提示框 -->
    <toast 
      :show="show" 
      :message="message" 
    />
  </div>
</template>

<script>
import DetaNavBar from "./childComps/DetaNavBar.vue";
import { debounce } from "common/utils";
import Bscroll from "components/common/bscroll/Bscroll";
import DetailGoods from "./childComps/DetailGoods.vue";
// 导入网络请求相关的类和函数
import {
  getDetailData,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail_request.js";
import BackTop from "components/content/BackTop/BackTop.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
import Toast from "components/common/toast/Toast.vue";
export default {
  name: "Detail",
  components: {
    DetaNavBar,
    Bscroll,
    DetailGoods,
    BackTop,
    DetailBottomBar,
    Toast
  },
  data() {
    return {
      show: false,
      message: "",
      iid: "",
      topImgs: [],
      goods: {},
      shop: {},
      detailGoodslInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      DetailData: {},
      isShowBackTop: false
    };
  },
  created() {
    // 切换路由时，拿到从home点击的商品iid,然后根据iid请求数据
    this.iid = this.$route.query.iid;
    this.getDetailData();
  },
  activated () {
    // 判断本地存储，是否收藏商品，若有，则收藏键为空
    if(localStorage.getItem(`${this.iid}`)){
      this.$refs.bottomBar.isCollection = true
    }else{
      this.$refs.bottomBar.isCollection = false
    }
  }
  ,
  mounted() {
    // 监听goodsListItem的发送的事件总线，然后刷新content的高度
    // 防抖操作
    const result = debounce(this.$refs.bscroll.refresh, 100);
    this.$bus.$on("detailImg", () => {
      result();
    });
  },
  methods: {
    getDetailData() {
      // 请求详情页的所有数据，除推荐
      let get = getDetailData(this.iid).then(
        res => {
          const data = res.result;

          this.DetailData = data;
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
        },
        rec => {
          console.log(rec);
          alert("sorry,您的网络好像出了点问题");
        }
      );
      get.catch(rec => alert("sorry,您的网络好像不太好，请刷新重试"));
      // 请求推荐商品的数据
      getRecommend().then(res => {
        this.recommendList = res.data.list;
        // console.log(this.recommendList)
      });
    },
    imagesLoad() {
      this.$refs.bscroll.refresh();
    },
    // 根据detail-navbar的点击切换不同的子路由
    switchRoute(index) {
      switch (index) {
        case 0:
          {
            this.$router.push({
              path: `/detail/DetailGoods/?iid=${this.iid}`
            });
          }
          break;
        case 1:
          {
            this.$router.push({
              path: `/detail/DetailParamInfo/?iid=${this.iid}`
            });
          }
          break;
        // 跳转到推荐列表
        case 2:
          {
            this.$router.push({
              path: `/detail/CommentInfo/?iid=${this.iid}`
            });
          }
          break;
        case 3: {
          this.$router.push({
            path: `/detail/RecommendInfo/?iid=${this.iid}`
          });
        }
      }
    },
    backTop() {
      // 拿到Bscroll组件对象中的bs，调用方法，回到顶部
      // this.$refs.scroll.bs.scrollTo
      this.$refs.bscroll.scrollTo(0, 0, 500);
    },
    // 设置滚动事件，判断是否显示回到顶部按钮
    contentScroll(position) {
      this.isShowBackTop = position.y < -350 ? true : false;
    },
    addGood() {
      // 将整个商品的参数传递过去
      // 1.创建对象
      const product = {};
      // 2.添加商品描述信息
      product.iid = this.iid;
      product.imgURL = this.topImgs[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.newPrice = this.goods.newPrice;

      // 3.添加到状态管理中,拿到返回的Promise
      let p = this.$store.dispatch("addGood", product);
      p.then(res => {
        this.show = true;
        this.message = res;
      });
      setTimeout(() => {
        this.show = false;
        this.message = "";
      }, 1000);
    },
    // 收藏按钮
    collection() {
      window.localStorage.setItem(`${this.iid}`,`${this.iid}`)
      if (this.$refs.bottomBar.isCollection) {
        // 加入本地存储
        this.show = true;
        this.message = "收藏成功";

        setTimeout(() => {
          this.show = false;
          this.message = "";
        }, 1000);
      } else {
        this.show = true;
        this.message = "取消收藏";
        setTimeout(() => {
          this.show = false;
          this.message = "";
        }, 1000);
      }
    },
    buyGood(){
      // 购买商品，将商品信息穿给状态管理，然后跳转页面
      const product = {};
      // 2.添加商品描述信息
      product.iid = this.iid;
      product.imgURL = this.topImgs[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.newPrice = this.goods.newPrice;
      // 3.添加到状态管理中,拿到返回的Promise
      let p = this.$store.dispatch("addGood", product);
      
      this.$router.push("/cart")
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
  top: 0;
  left: 0;
  position: relative;
  z-index: 10;
  background-color: white;
}
.wrapper {
  height: calc(100% - 93px);
}
</style>
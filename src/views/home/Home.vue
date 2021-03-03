<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <tab-control
      :titles="['流行','新款','精选']"
      ref="tabControlTop"
      @tabClick="tabClick"
      :class="{fixed:isTabFixed}"
      class="tab-control-top"
    />
    <Bscroll
      ref="scroll"
      :probe-type="3"
      :pullUpLoad="true"
      @contentScroll="contentScroll"
      @refresh="refresh"
      @pullingUp="upData"
    > 
      <!-- 加上填充，因为数据没有请求过来时,content的高度无法滚动，
        即无法触发better-scroll的ontouchend事件
      -->
      <!-- <div v-show="!isShowTc" class="tc"></div> -->
      <HomeSwiper :banners="banners" class="home-swiper" @swiperImgLoad="swiperImgLoad" />
      <HomeRecom-view :recommend="recommend" @recomImgLoad="recomImgLoad" />
      <home-fearture />
      <tab-control :titles="['流行','新款','精选']" ref="tabControl" @tabClick="tabClick" />
      <goods-list :good="showGoods" />
    </Bscroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
    <toast :show="show" :message="message" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/TabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList.vue";
import Bscroll from "components/common/bscroll/Bscroll.vue";
import BackTop from "components/content/BackTop/BackTop.vue";

import { debounce, throttle } from "common/utils.js";
import { getHomeMultidata, getHomeGoods } from "network/home_request.js";

import HomeSwiper from "./childComps/Swiper.vue";
import HomeRecomView from "./childComps/RecomView.vue";
import HomeFearture from "./childComps/FeatureView.vue";
import Toast from "components/common/toast/Toast.vue";
export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Bscroll,
    BackTop,
    HomeSwiper,
    HomeRecomView,
    HomeFearture,
    Toast
  },
  data() {
    return {
      banners: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      type: "pop",
      isShowBackTop: false,
      tabControlTop: 0,
      isTabFixed: false,
      scrollY: 0,
      message: "",
      show: false,
      debounce: debounce
    };
  },
  // 当组件被创建时，请求网络请求
  created() {
    // 请求轮播图和推荐的数据
    this.getHomeMultidata();
    // 组件一被创建，。默认请求主页商品的数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    let result = debounce(this.$refs.scroll.refresh, 500);
    result = throttle(this.$refs.scroll.refresh, 300);
    this.$bus.$on("imgLoad", () => {
      result();
    });
  },
  activated() {
    //进入home时，调用bs实例的scrollTo方法，进入离开之前的状态，重新计算一次
    this.$refs.scroll.scrollTo(0, this.scrollY, 10);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 记录离开home时，content的位置
    this.scrollY = this.$refs.scroll.bs.y;
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(
        res => {
          // 响应成功
          if (res) {
            // 取出网络请求返回的data,并存放在home的data中
            // 这里因为是箭头函数，所以this是created的this,
            // 而created的this指向实现created的组件
            // console.log(res)
            this.banners = res.data.banner.list;
            this.recommend = res.data.recommend.list;
            // 拦截器 this.banner = red.data.data.recommend.list
            console.log("轮播图，推荐数据请求成功");
          } else {
            // 响应失败
            this.show = true;
            this.message = "您的网络似乎出了点小问题，请上拉刷新重试";
            setTimeout(() => {
              this.show = false;
              this.message = "";
            }, 2000);
          }
        },
        err => {
          // 请求失败
          this.show = true;
          this.message = "您的网络似乎出了点小问题，请上拉刷新重试";
          setTimeout(() => {
            this.show = false;
            this.message = "";
          }, 2000);
        }
      );
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(
        res => {
          if (res) {
            // 将请求成功的数据，添加到对应type的list中,在将相应的页码+1
            this.goods[type].list.push(...res.data.list);
            this.goods[type].page += 1;

            // 刷新触底函数的次数
            this.$refs.scroll.finishPullUp();
            console.log("流行，新款，精选数据请求成功");
          } else {
            // 响应失败
            this.show = true;
            this.message = "您的网络似乎出了点小问题，请上拉刷新重试";
            setTimeout(() => {
              this.show = false;
              this.message = "";
            }, 2000);
          }
        },
        err => {
          // 请求失败
          this.show = true;
          this.message = "您的网络似乎出了点小问题，请上拉刷新重试";
          setTimeout(() => {
            this.show = false;
            this.message = "";
          }, 2000);
        }
      );
    },
    home_type(type) {
      this.type = type;
    },
    backTop() {
      // 拿到Bscroll组件对象中的bs，调用方法，回到顶部
      // this.$refs.scroll.bs.scrollTo
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // better-scroll的滚动事件
    contentScroll(position) {
      this.isShowBackTop = position.y < -850 ? true : false;
      if (this.tabControlTop - 44 < -position.y) {
        this.isTabFixed = true;
      } else {
        this.isTabFixed = false;
      }
    },
    // 上拉刷新
    refresh(position) {
      const p = new Promise((resolve, reject) => {
        // 若触发better-scroll的touchEnd事件
        if (position.y > 20) {
          console.log("刷新数据-home")
          // 请求轮播图和推荐的数据
          this.getHomeMultidata();
          // 组件一被创建，。默认请求主页商品的数据
          this.getHomeGoods("pop");
          this.getHomeGoods("new");
          this.getHomeGoods("sell");
          resolve("刷新成功");
        }
      });
      p.then(reason => {
        // 判断是否有数据
        if (this.banners || this.goods || this.recommend) {
          this.show = true;
          this.message = reason;
          setTimeout(() => {
            this.show = false;
            this.message = "";
          }, 1000);
        }
      });
    },
    upData() {
      this.getHomeGoods(this.type);
    },
    swiperImgLoad() {
      this.tabControlTop = this.$refs.tabControl.$el.offsetTop;
    },
    recomImgLoad() {
      // 不管weiper和recommend中谁的图片先加载，后加载的赋值操作会覆盖掉前面的赋值操作
      // 这样就达到了同时监听两个图片的完成加载事件
      this.tabControlTop = this.$refs.tabControl.$el.offsetTop;
    },
    tabClick(index) {
      if (index == 0) {
        this.type = "pop";
      } else if (index == 1) {
        this.type = "new";
      } else {
        this.type = "sell";
      }
      this.$refs.tabControlTop.index = index;
      this.$refs.tabControl.index = index;
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.type].list;
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  /* 在父组件home中给以子组件nar-bar样式 */
  background-color: var(--color-tint);
  /* background-color: white; */
  color: rgb(255, 255, 255);
}
.tab-control-top {
  position: absolute;
  top: -44px;
  right: 0;
  left: 0;
}
.content {
  /* height: calc(100% - 49px);  */
  /* overflow: hidden; */
  position: absolute;
  top: 44px;
  /* bottom: 49px; */
  padding-bottom: 49px;
  z-index: 1;
}
.wrapper {
  /* margin-top: 44px ; */
  height: calc(100% - 93px);
}
#home .fixed {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 9;
}
.nav-bar {
  position: relative;
}
.Toast {
  top: 44px;
}
.tc {
  width: 100vw;
  height: 100vh;
}
</style>

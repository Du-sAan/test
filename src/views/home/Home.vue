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
      @contentScroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="upData">
      <HomeSwiper 
        :banners="banners" 
        class="home-swiper" 
        @swiperImgLoad="swiperImgLoad"
      />
      <HomeRecom-view 
        :recommend="recommend" 
        @recomImgLoad="recomImgLoad"
      />
      <home-fearture />
      <tab-control 
        :titles="['流行','新款','精选']" 
        ref="tabControl" 
        @tabClick="tabClick"
      />
      <goods-list :goods="showGoods"></goods-list>
    </Bscroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
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
    HomeFearture
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
      tabControlTop : 0,
      isTabFixed : false,
      scrollY: 0
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
  activated () {
    //进入home时，调用bs实例的scrollTo方法，进入离开之前的状态，重新计算一次
    this.$refs.scroll.scrollTo(0, this.scrollY, 0)
    this.$refs.scroll.refresh();
  },
  deactivated () {
    // 记录离开home时，content的位置
    this.scrollY = this.$refs.scroll.bs.y
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // 取出网络请求返回的data,并存放在home的data中
        // 这里因为是箭头函数，所以this是created的this,
        // 而created的this指向实现created的组件
        // console.log(res)
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
        // 拦截器 this.banner = red.data.data.recommend.list
        // console.log(res.data)
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // 将请求到的数据，添加到对应type的list中,在将相应的页码+1
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 刷新触底函数的次数
        this.$refs.scroll.finishPullUp();
      });
    },
    home_type(type) {
      this.type = type;
    },
    backTop() {
      // 拿到Bscroll组件对象中的bs，调用方法，回到顶部
      // this.$refs.scroll.bs.scrollTo
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      // console.log(position)
      this.isShowBackTop = position.y < -850 ? true : false;
      if( (this.tabControlTop-44) < -position.y){
        this.isTabFixed = true
      }else{
        this.isTabFixed = false
      }
    },
    upData() {
      this.getHomeGoods(this.type);
    },
    swiperImgLoad(){
      this.tabControlTop = this.$refs.tabControl.$el.offsetTop;
    },
    recomImgLoad(){
      // 不管weiper和recommend中谁的图片先加载，后加载的赋值操作会覆盖掉前面的赋值操作
      // 这样就达到了同时监听两个图片的完成加载事件
      this.tabControlTop = this.$refs.tabControl.$el.offsetTop;
    },
    tabClick(index) {
      if(index == 0){
        this.type = 'pop'
      }else if(index == 1){
        this.type = 'new'
      }else{
        this.type = 'sell'
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
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  /* 在父组件home中给以子组件nar-bar样式 */
  background-color: var(--color-tint);
  color: white;
}
.tab-control-top{
  position: absolute;
  top: 0;
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
  height: calc(100% - 93px);
}
#home .fixed{
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 9;
}
</style>

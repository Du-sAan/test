<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </NavBar>
    <HomeSwiper :banners="banners" class="home-swiper"></HomeSwiper>
    <HomeRecom-view :recommend="recommend"></HomeRecom-view>
    <home-fearture/>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" />
    <ul>
      <li>1</li>
      <li>3</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>0</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>3</li>
      <li>3</li>
      <li>3</li>
      <li>3</li>
      <li>3</li>
      <li>3</li>
      <li>3</li>
      <li>3</li>
      <li>3</li>
      <li>3</li>
      <li>3</li>
      <li>3</li>
      <li>3</li>
      <li>3</li>
      <li>3</li>
      <li>3</li>
      <li>3</li>
      <li>3</li>
      <li>3</li>
      <li>3</li>
    </ul>
  </div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/TabControl/TabControl"

import {getHomeMultidata} from "network/home_request.js"

import HomeSwiper from "./childComps/Swiper.vue"
import HomeRecomView from "./childComps/RecomView.vue"
import HomeFearture from "./childComps/FeatureView.vue"
export default {
  name : "Home",
  components : {
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecomView,
    HomeFearture,
  },
  data () {
    return {
      banners : [],
      recommend : []
    }
  },
  // 当组件被创建时，请求网络请求
  created () {
    getHomeMultidata().then( (res) => {
      // 取出网络请求返回的data,并存放在home的data中
      // 这里因为是箭头函数，所以this是created的this,
      // 而created的this指向实现created的组件
      // console.log(res)
      this.banners = res.data.banner.list;
      this.recommend = res.data.recommend.list
      // 拦截器 this.banner = red.data.data.recommend.list
      // console.log(res.data)
    })
  },
}
</script>

<style>
  #home{
    /* padding-top: 44px; */
    /* 抵消下方tabbar的高度 */
    padding-bottom: 49px;
  }
  .home-swiper{
    /* 因为上方导航栏绝对定位，脱离文档流 
      导致轮播图下移44px,而上方的导航栏遮住了轮播图
      但是给home设置padding:44px,导致视口也被挤上去，
      进而导致上方导航栏上移
      所以给轮播图一个margin-top，把轮播图往下挤，
    */
    margin-top: 44px;
  }
  .home-nav{
    /* 在父组件home中给以子组件nar-bar样式 */
    background-color: var(--color-tint);
    color : white;
  }
  .tab-control{
    position: sticky;
    top: 44px;
  }
</style>

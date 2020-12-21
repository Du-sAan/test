<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </NavBar>
    <HomeSwiper :banners="banners"></HomeSwiper>
    <HomeRecom-view :recommend="recommend"></HomeRecom-view>
  </div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import {getHomeMultidata} from "network/home_request.js"
import HomeSwiper from "./childComps/HomeSwiper.vue"
import HomeRecomView from "./childComps/HomeRecomView.vue"

export default {
  name : "Home",
  components : {
    NavBar,
    HomeSwiper,
    HomeRecomView
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
      console.log(this.recommend)
    })
  },
}
</script>

<style>
  .home-nav{
    /* 在父组件home中给以子组件nar-bar样式 */
    background-color: var(--color-tint);
    color : white;
  }
</style>
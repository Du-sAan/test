<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </NavBar>
    <HomeSwiper :banners="banners" class="home-swiper"></HomeSwiper>
    <HomeRecom-view :recommend="recommend"></HomeRecom-view>
    <home-fearture></home-fearture>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" />
    <goods-list :goods="goods['pop'].list"></goods-list>
  </div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/TabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList.vue"

import {getHomeMultidata,getHomeGoods} from "network/home_request.js"


import HomeSwiper from "./childComps/Swiper.vue"
import HomeRecomView from "./childComps/RecomView.vue"
import HomeFearture from "./childComps/FeatureView.vue"
export default {
  name : "Home",
  components : {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    HomeRecomView,
    HomeFearture,
  },
  data () {
    return {
      banners : [],
      recommend : [],
      goods : {
        'pop' : {page : 0, list : []},
        'new' : {page : 0, list : []},
        'sell' : {page : 0, list : []},
      }
    }
  },
  // 当组件被创建时，请求网络请求
  created () {
    // 请求轮播图和推荐的数据
    this.getHomeMultidata()
    // 请求主页商品的数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods :{
    getHomeMultidata(){
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
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then((res)=>{
        // 将请求到的数据，添加到对应type的list中,在将相应的页码+1
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    }
  }
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
    top: 43px;
    z-index: 9;
  }
</style>

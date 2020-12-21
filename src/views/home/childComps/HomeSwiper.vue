<template>
  <Swiper>
      <Swiper-Item v-for="item in banners"  :key="item.acm">
        <a :href="item.link">
          <img :src="item.image" alt="item.title">
        </a>
      </Swiper-Item>
    </Swiper>  
</template>

<script>
// 引入轮播图
import {Swiper,SwiperItem} from "components/common/swiper/index"
export default {
  name : "HomeSwiper",
  components : {
    Swiper,
    SwiperItem
  },
  props :{
    banners : {
      type : Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>

</style>
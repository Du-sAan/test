<template>
  <swiper>
    <swiper-item 
      v-for="(item,index) of topImgs" 
      :key="index"
    >
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper/index.js"
export default {
  name : "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImgs :{
      type : Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  #hy-swiper{
    height: 200px;
    overflow: hidden;
  }
  

</style>
<template>
  <div id="detail">
    <deta-nar-bar />
    <detail-swiper :topImgs="topImgs" />
  </div>
</template>

<script>
import DetaNarBar from "./childComps/DetaNavBar.vue"
import DetailSwiper from "./childComps/DetailSwiper.vue"

import {getDetailData} from "network/detail_request.js"
export default {
  name : "Detail",
  components: {
    DetaNarBar,
    DetailSwiper
  },
  data () {
    return {
      iid : '',
      topImgs : []
    }
  },
  created () {
    this.iid = this.$route.query.iid
    this.getDetailData()
  },
  // activated () {
  //   this.iid = this.$route.query.iid
  //   this.getDetailData()
  // },
  methods: {
    getDetailData() {
      getDetailData(this.iid).then((res)=>{
        // 1.保存轮播图的数据
        this.topImgs = res.result.itemInfo.topImages
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
  #detail{
    padding-top: 44px;
  }
</style>
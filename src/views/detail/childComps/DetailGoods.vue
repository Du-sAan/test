<template>
  <div class="Detail-goods">
    <detail-swiper :topImgs="topImgs" />
    <detail-base-info :goods="goods" />
    <detail-shop-info :shop="shop" />
    <!-- :detailGoodslInfo="detailGoodslInfo" @imagesLoad="imagesLoad" -->
    <!-- 图片等 -->
    <detail-goods-info :detailGoodslInfo="detailGoodslInfo" />
  </div>
</template>

<script>
import DetailSwiper from "./DetailSwiper.vue";
import DetailBaseInfo from "./DetailBaseInfo.vue";
import DetailShopInfo from "./DetailShopInfo.vue";
import DetailGoodsInfo from "./DetailGoodsInfo.vue";
export default {
  name: "DetailGoods",
  components: {
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo
  },
  data() {
    return {
      // topImgs,
      // goods,
      // shop,
      // detailGoodslInfo
    };
  },
  props: {
    topImgs: {
      type: Array,
      default: function() {
        return [];
      }
    },
    goods: {
      type: Object,
      default: function() {
        return {a : 1};
      }
    },
    shop: {
      type: Object,
      default: function() {
        return {};
      }
    },
    detailGoodslInfo: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  created() {
    // console.log(this.goods,)
  },
  methods: {
    imagesLoad() {
      this.$refs.bscroll.refresh();
    }
  }
};
</script>

<style >
</style>
<template>
  <div class="goods-list">
    <goods-list-item
    v-for="(item,id) of good"
    :key="id"
    :goodsItem="item" />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue"
export default {
  name : "GoodsList",
  props : {
    good : {
      type : Array,
      default (){
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style>
  .goods-list{
    display: flex;
    /* 按照侧轴换行 */
    flex-wrap: wrap;
    /* 空白环绕弹性元素周围 */
    justify-content: space-around;
    padding: 2px;
  }
</style>
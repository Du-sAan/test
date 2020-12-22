<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item of recommend" :key="item.sort">
      <a :href="item.link">
        <img :src="item.image" alt="item.title">
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name : "HomeRecomView",
  props :{
    recommend : {
      type : Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
  .recommend{
    display: flex;
    /* 设置弹性元素居中 */
    /* justify-content: center */
    text-align: center;
    font-size: 12px;

    padding: 12px 0 20px 0 ;
    border-bottom: 5px solid #eee;
  }
  .recommend-item{
    flex-grow: 1;
  }
  .recommend-item a{
    /* 使用户点击整个recommend-item都有链接 */
    display: block;
    height: 100%;
  }
  .recommend-item img{
    margin-bottom: 7px;
    height: 68px;
  }
</style>
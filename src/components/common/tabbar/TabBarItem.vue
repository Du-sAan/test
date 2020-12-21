<template>
    <!-- :class="{active:isActive}" -->
    <div class="tab-bar-item" @click="itemClick" :style="avtiveStyle">
      <div ><slot name="item-font" ></slot></div>
      <div ><slot name="item-text"></slot></div>
    </div>

</template>

<script>
export default {
  name : "TabBarItem",
  props :{
    path : String,
    activeColor : {
      type : String,
      default : "red"
    }
  },
  // data () {
  //   return {
  //     isActive : false
  //   }
  // },
  computed :{
    isActive(){
      // 判断当前路由是否与父组件传过来的路径相同
      return this.$route.path == this.path
      // 或者indexOf
      // return this.$route.path.indexOf(this.path) !== -1
    },
    avtiveStyle(){
      // 先判断当前路由是否活跃
      return this.isActive ? {color : this.activeColor} : {}
    }
  },
  methods :{
    itemClick() {
      this.$router.push(this.path)
    }
  }
}
</script>

<style>
  .tab-bar-item{
    margin-top: 8px;
    flex-grow:  1;
    text-align: center;
    font-size: 14px;

  }
  .tab-bar-item .fa{
    font-size: 18px;
  }
  .tab-bar-item p{
    font-size: 12px;
  }
  /* .active{
    color: rgb(223, 185, 17);
  } */
</style>

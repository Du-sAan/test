<template>
  
    <tab-bar>
      <tab-bar-item path="/home" activeColor="rgb(223, 185, 17)">
        <p class="fa" slot="item-font">&#xf015;</p>
        <p slot="item-text">首页</p>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="rgb(223, 185, 17)">
        <p class="fa" slot="item-font">&#xf009;</p>
        <p slot="item-text">分类</p>
      </tab-bar-item>
      <tab-bar-item path="/cat" activeColor="rgb(223, 185, 17)">
        <p class="fa" slot="item-font">&#xf07a;</p>
        <p slot="item-text">购物车</p>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="rgb(223, 185, 17)">
        <p class="fa" slot="item-font">&#xf2c0;</p>
        <p slot="item-text">我的</p>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar.vue"
import TabBarItem from "components/common/tabbar/TabBarItem.vue"

export default {
  name : "MainTabbar",
  components : {
    TabBar,
    TabBarItem,
  }
}
</script>

<style>

</style>
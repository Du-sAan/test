<template>
  <div id="category">
    <NavBar class="category-nav">
      <div slot="center">
        分类
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
export default {
  name : "Category",
  components : {
    NavBar
  }
}
</script>

<style>
  .category-nav{
    /* 在父组件home中给以子组件nar-bar样式 */
    background-color: var(--color-tint);
    color : black;
  }
</style>
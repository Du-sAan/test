<template>
  <div id="category">
    <NavBar class="category-nav">
      <div slot="center">
        分类
      </div>
    </NavBar>
    <Bscroll >
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </Bscroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import Bscroll from "components/common/bscroll/Bscroll.vue"
export default {
  name : "Category",
  components : {
    NavBar,
    Bscroll
  }
}
</script>

<style scoped>
  .category-nav{
    /* 在父组件home中给以子组件nar-bar样式 */
    background-color: var(--color-tint);
    color : rgb(216, 21, 21);
  }
  .wrapper{
    height: 600px;
  }
</style>

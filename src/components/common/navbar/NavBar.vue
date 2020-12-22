<template>
  <div class="nav-bar">
    <!-- 用DIV包裹住插槽，然后在插槽中写样式，是因为插槽会被替换，样式会丢失 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name : "NavBar"
}
</script>

<style>
  .nav-bar{
    display: flex;
    
    /* 固定其定位 */
    position: fixed;
    left : 0;
    top : 0;
    z-index: 9;
    width: 100%;

    /* 设置nav-bar的行高使其中的文字能撑起nvabar的高度 */
    height: 44px;
    line-height: 44px;
    text-align: center;
    /* color : black; */

    /* 设置nav-bar的样式 */
    /* background-color: #f6f6f6; */
    box-shadow: 0 2px 2px rgba(100, 100, 100, 0.2);
  }
  .nav-bar .left,.right{
    /* 给left,right一个默认的宽度 */
    width: 60px;
  }
  .nav-bar .center{
    /* 让中间的内容占满父元素剩余的空间 */
    flex-grow: 1;
  }
</style>
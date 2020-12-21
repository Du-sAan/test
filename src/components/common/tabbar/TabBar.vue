<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
import font from "assets/font-awesome-4.7.0/css/font-awesome.css"
export default {
  name : "TabBar"
}
</script>

<style>

  #tab-bar{
    display: flex;
    position : fixed;
    left: 0;
    bottom: 0;
    height: 49px;
    width: 100%;
    background-color: #f2f2f2;
    box-shadow: 0 -1px 1px rgba(black, 0.3);
  }
</style>
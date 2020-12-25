<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="" title="回到顶部" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
};
</script>

<style>
.back-top {
  position: absolute;
  right: 10px;
  bottom: 49px;
  z-index: 99;
}
.back-top img {
  width: 40px;
  height: 40px;
}
</style>
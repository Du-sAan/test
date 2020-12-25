<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Bscroll",
  data() {
    return {
      bs: null
    };
  },
  props: {
    probeType: {
      type: Number,
      defaule() {
        return 0;
      }
    }
  },
  mounted() {
    this.bs = new BScroll(this.$refs.wrapper, {
      click: true,
      mouseWheel: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    this.bs.on("scroll", position => {
      this.$emit("contentScroll", position);
    });
  },
  methods: {
    // 封装bs对象中的方法
    scrollTo(x, y, time) {
      this.bs && this.bs.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.bs && this.bs.finishPullUp();
    },
    refresh() {
      console.log('起飞')
      this.bs && this.bs.refresh();
    }
  }
};
</script>

<style>
</style>
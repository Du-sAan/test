<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { debounce} from "common/utils.js";
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
      default:0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.bs = new BScroll(this.$refs.wrapper, {
      click: true,
      mouseWheel: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    // 是否需要实时监听滚动
    if (this.probeType === 2 || this.probeType === 3) {
      // 发送滚动事件
      this.bs.on("scroll", position => {
        this.$emit("contentScroll", position);
      });
      // 发送上拉刷新事件
      this.bs.on("touchEnd", position => {
        this.$emit("refresh", position);
      })
    }
    // 是否需要触底监听
    if (this.pullUpLoad) {
      this.bs.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    // 封装bs对象中的方法
    scrollTo(x, y, time) {
      this.bs && this.bs.scrollTo(x, y, time);
    },
    // 刷新触底事件
    finishPullUp() {
      this.bs && this.bs.finishPullUp();
    },
    refresh() {
      this.bs && this.bs.refresh();
    }
  }
};
</script>

<style>

</style>
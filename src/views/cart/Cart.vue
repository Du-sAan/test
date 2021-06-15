<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{GoodCount}})</div>
    </nav-bar>
    <cart-list class="cart-list" :goodList="GoodList" />
    <bottom-bar @settlement="settlement" />
    <toast :show="show" :message="message" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import BottomBar from "./childComps/BottomBar";
import Toast from "components/common/toast/Toast.vue";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    BottomBar,
    Toast
  },
  data() {
    return {
      show: false,
      message: ""
    };
  },
  computed: {
    GoodCount() {
      return this.$store.state.GoodList.length;
    },
    GoodList() {
      return this.$store.state.GoodList;
    }
  },
  methods: {
    settlement() {
      // 若登录
      if (this.$store.state.loginStatus) {
        this.$router.push("/settlement");
      } else {
        this.show = true;
        this.message = "请先登录";
        setTimeout(() => {
          this.show = false;
          this.message = "";
        }, 2000);
      }
    }
  }
};
</script>

<style scoped>
#cart {
  /*position: relative;*/
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.cart-list {
  position: absolute;
  top: 44px;
  bottom: 49px;
  width: 100%;
}
</style>

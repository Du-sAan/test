<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" @checkBtnClick="checkBtnClick" v-model="isSelectAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span @click="clear">清空购物车</span>
    <span class="buy-product" @click="settlement">去计算({{$store.state.GoodList.length}})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

export default {
  name: "BottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      const goodList = this.$store.state.GoodList;
      // 返回购物车中所有商品的总价
      return goodList
        .filter(item => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          // 将str类型的价格处理后返回
          return (
            preValue +
            item.count *
              parseFloat(item.newPrice.replace(/¥|~/g, "").slice(0, 5)).toFixed(2)
          );
        }, 0);
    },
    isSelectAll: function() {
      return (
        this.$store.state.GoodList.find(item => item.checked === false) ===
        undefined
      );
    }
  },
  methods: {
    checkBtnClick() {
      // 1.判断是否有未选中的按钮
      let isSelectAll = this.$store.state.GoodList.find(item => !item.checked);

      // 2.有未选中的内容, 则全部选中
      if (isSelectAll) {
        this.$store.state.GoodList.forEach(item => {
          item.checked = true;
        });
      } else {
        this.$store.state.GoodList.forEach(item => {
          item.checked = false;
        });
      }
    },
    clear() {
      this.$store.commit("clearGoodList");
    },
    settlement() {
      // 是否登录
      this.$emit("settlement");
    }
  }
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 1rem;
  font-size: 1rem;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
.bottom-menu span:nth-of-type(3) {
  margin-left: 1rem;
  text-align: center;
  line-height: 44px;
  color: rgb(245, 106, 26);
}
</style>

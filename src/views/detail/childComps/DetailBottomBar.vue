<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <!-- 点击收藏 -->
      <div @click="collection" :class="{isActive : isCollection}">
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addGood">加入购物车</div>
      <div class="buy" @click="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  data () {
    return {
      isCollection : false  
    }
  },
  methods: {
    addGood() {
      // 发送商品加入购物车的事件
      alert("已加入购物车");
      this.$emit("addGood");
    },
    buy() {
      let passwd = prompt("请输入支付密码");
      // 添加判断条件
      if(passwd){
        // 发送购买商品的事件
      this.$emit("buyGood",passwd);
      alert("购买完成,您可以在我的订单中查看该订单")
      }
    },
    collection() {
      if(!this.isCollection)alert("已收藏")
      this.isCollection = !this.isCollection
      if(!this.isCollection) alert("已取消收藏")
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 58px;
  position: fixed;
  background-color: #fff;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 20px;
  display: flex;
  text-align: center;
}

.bar-item {
  flex: 1;
  display: flex;
}

.bar-item > div {
  flex: 1;
}

.bar-left .text {
  font-size: 13px;
}

.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}

.bar-left .service {
  background-position: 0 -54px;
}

.bar-left .shop {
  background-position: 0 -98px;
}

.bar-right {
  font-size: 14px;
  color: #fff;
  line-height: 58px;
}

.bar-right .cart {
  background-color: #ffe817;
  color: #333;
}

.bar-right .buy {
  background-color: #f69;
}
.isActive{
  background-color: red;
}
</style>

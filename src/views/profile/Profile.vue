<template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="center">个人中心</div>
    </nav-bar>
    <!--1.单独封装一个组件: 利用slot知识点-->
    <UserInfo></UserInfo>

    <!--2.没有单独封装: 不同的地方太多, 需要传过多的参数-->
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
        <div class="line"></div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">订单</div>
        <div class="line"></div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>条
        </div>
        <div class="account-info">我的消息</div>
        <div class="line"></div>
      </div>
    </section>

    <!--3.封装成一个整体-->
    <list-view :list-data="orderList" class="order-list" ></list-view>
    <list-view :list-data="serviceList" class="service-list" @click.native="cart"></list-view>
  </div>
</template>

<script>
import UserInfo from "./childComps/UserInfo";
import ListView from "./childComps/ListView";
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "Profile",
  components: {
    UserInfo,
    ListView,
    NavBar
  },
  data: function() {
    return {
      orderList: [
        { icon: "#order", iconColor: "#ff8198", info: "我的客服" },
        { icon: "#point", iconColor: "#fc7b53", info: "我的订单" },
        { icon: "#vip", iconColor: "#ffc636", info: "我的收藏" }
      ],
      serviceList: [
        { icon: "#service", iconColor: "#ff8198", info: "我的购物车" },
        { icon: "#download", iconColor: "#ff8198", info: "下载购物APP" }
      ]
    };
  },
  methods : {
    cart (){
      this.$router.push('/cart')
    }
  }
};
</script>

<style scoped>
@keyframes background-move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
}
#profile {
  padding-top: 44px;
  /* background: linear-gradient(
    135deg,
    rgb(240, 135, 86),
    rgb(182, 240, 90),
    hsl(190deg, 80%, 70%),
    hsl(250deg, 80%, 70%),
    hsl(320deg, 80%, 70%)
  );
  background-size: 200% 200%;

  animation: background-move 5s infinite alternate; */
  background-color: rgb(248, 248, 248);
  height: calc(100vh - 44px);
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: rgb(238, 16, 16);
}

.account {
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(255, 255, 255);
}

.account-item {
  width: 100%;
  /* background-color: #fff; */
  margin-right: 1px;
  text-align: center;
}

.account-item:last-of-type {
  margin-right: 0;
}

.account-item {
  color: #666;
  font-size: 13px;
  padding: 18px;
  position: relative;
}

.account-item .balance {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}

.account-info {
  margin-top: 6px;
}

.account-item::before{
  content : "";
  display: inline-block;
  width: 40%;
  height: 1px;
  background-color: #333;
  position: absolute;
  left: 50%;
  bottom : 0;
  transform: translateX(-50%);
}
.order-list,
.service-list {
  margin-top: 12px;
}
</style>

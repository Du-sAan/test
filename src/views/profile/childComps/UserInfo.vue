<template>
  <div id="user-info">
    <a href="javascript:;" class="clear-fix">
      <slot name="user-icon">
        <div class="privateImage left">
          <!-- <img src="~assets/img/profile/avatar.jpeg" alt="头像"> -->
        </div>
      </slot>
      <div class="login-info left" @click="signIn" v-show="!this.$store.state.loginStatus">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <svg data-v-735ff1be fill="#fff" class="icon-mobile">
              <use data-v-735ff1be xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile" />
            </svg>
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <div class="login-info left" v-show="this.$store.state.loginStatus">
        <span class="username" >{{username}}</span>
        <br />
        <span class="username">你好</span>
      </div>
      <div class="log-out" @click="loginOut">退出登录</div>
    </a>
    <toast :show="show" :message="message" />
  </div>
</template>

<script>
import Toast from "components/common/toast/Toast.vue";
export default {
  name: "UserInfo",
  data() {
    return {
      showInfo: false,
      data: {},
      username: "",
      show: false,
      message: ""
    };
  },
  components: {
    Toast
  },
  created() {
    this.showInfo = this.$store.state.loginStatus;
    this.data = this.$store.state.userInfo;
    this.username = this.$store.state.userInfo.username
  },
  methods: {
    signIn() {
      this.$router.push("/signIn");
    },
    loginOut() {
      // 如果登录才退出
      if (this.$store.state.loginStatus) {
        this.show = true;
        this.message = "退出成功";

        setTimeout(() => {
          this.show = false;
          this.message = "";
          this.$store.commit("loginOut");
        }, 2000);
        return;
      }
      this.show = true;
      this.message = "请先登录~";
      setTimeout(() => {
        this.show = false;
        this.message = "";
      }, 1000);
    }
  }
};
</script>

<style scoped>
#user-info {
  background-color: var(--color-tint);
  padding: 15px;
  margin-top: -5px;
  position: relative;
}

#user-info .privateImage {
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 30px;
}
.privateImage {
  background: url("~assets/img/profile/avatar.jpeg");
  background-size: cover;
}
.left {
  float: left;
}

#user-info .arrow-svg {
  width: 11px;
  height: 22px;
  margin-top: 18px;
}

#user-info .login-info {
  color: rgb(3, 3, 3);
  margin: 10px 0 0 10px;
}

#user-info .login-info .phone {
  position: relative;

  font-size: 13px;
  margin-top: 5px;
  margin-left: 15px;
  font-weight: 300;
}

#user-info .login-info .phone .icon-mobile {
  position: absolute;
  width: 12px;
  height: 18px;
  left: -15px;
  top: 0px;
}
.log-out {
  position: absolute;
  bottom: 50%;
  right: 0;
  text-align: center;
}
.username {
  color: #333;
  font-size: 1rem;
  margin-left: 20px;
  font-weight: 600;
}

</style>

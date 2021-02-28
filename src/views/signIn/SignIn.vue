<template>
  <div class="container">
    <form class="login-form">
      <div class="sign-by-wd" v-show="method === 'passwd' ? true : false">
        <input type="text" name="phone" v-model="phone" placeholder="手机号" />
        <input type="password" name="password" v-model="passwd" placeholder="密码" />
      </div>
      <div class="sign-by-code" v-show="method === 'code' ? true : false">
        <input type="text" name="phone" v-model="phone" placeholder="手机号" />
        <input type="text" name="code" v-model="code" placeholder="验证码" />
        <button type="button" class="get-code" @click="getCode">点击获取</button>
      </div>
      <button @click="sign" type="button">登录</button>
      <h2 @click="goRegister">
        没有账号？去注册
        <i class="fa fa-clone"></i>
      </h2>
      <div class="sign-method">
        <span @click="methodWd">密码登录</span>
        <span class="line"></span>
        <span @click="methodCode">验证登录</span>
      </div>
    </form>
    <div class="other-sign">
      <div></div>
      <span>其它登录方式</span>
      <div></div>
    </div>
    <div class="link" @click="link">
      <span class="iconfont icon-QQ"></span>
      <span class="iconfont icon-weixin"></span>
      <span class="iconfont icon-zhifubao"></span>
    </div>
    <!-- 提示框 -->
    <toast :show="show" :message="message" />
  </div>
</template>

<script>
import Toast from "components/common/toast/Toast.vue";
export default {
  name: "SignIn",
  components: {
    Toast
  },
  data() {
    return {
      show: false,
      message: "",
      // 登录方式
      method: "passwd",
      phone: "",
      passwd: "",
      // 用户输入的验证码
      code: "",
      //  模拟的验证码
      checkCode: ""
    };
  },
  methods: {
    sign() {
      // 表单校验,密码登录
      let check = sessionStorage.getItem(this.phone);
      // 如果输入的是错误的手机号
      if (!check) {
        this.show = true;
        this.message = "该手机号不存在!";
        setTimeout(() => {
          (this.show = false), (this.message = "");
        }, 1000);
        return;
      }
      // 如果登录方式为密码登录
      if (this.method === "passwd") {
        // 如果输入的是错误的密码
        if (!(JSON.parse(check).passwd === this.passwd)) {
          this.show = true;
          this.message = "密码错误!";
          setTimeout(() => {
            (this.show = false), (this.message = "");
          }, 1000);
          return;
        } else {
          // 若密码正确
          this.show = true;
          this.message = "登录成功！";
          setTimeout(() => {
            // 状态改为true,
            this.$store.commit("login", {
              // 负载：登录状态，用户信息
              status: true,
              username : JSON.parse(check).username,
              info: JSON.parse(check)
            });
            this.show = false;
            this.message = "";
            this.phone = "";
            this.code = "";
            this.checkCode = "";
            this.passwd = "";
            this.$router.push("/profile");
          }, 1000);
        }
      }
      // 如果登录方式为验证码
      if (this.method === "code") {
        if (this.code !== String(this.checkCode) || this.code === "") {
          this.show = true;
          this.message = "验证码错误!";
          setTimeout(() => {
            (this.show = false), (this.message = "");
          }, 1000);
          return;
        } else {
          this.show = true;
          this.message = "登录成功！";
          setTimeout(() => {
            this.$store.commit("login", {
              // 负载：登录状态，用户信息
              status: true,
              username : JSON.parse(check).username,
              info: JSON.parse(sessionStorage.getItem(this.phone))
            });
            // 登录成功，跳转到个人信息
            this.$router.push("/profile");
            // 全局状态改为:登录成功
          }, 1000);
          // 登录成功，清空之前的填写的信息
          this.show = false;
          this.message = "";
          this.phone = "";
          this.code = "";
          this.checkCode = "";
          this.passwd = "";
        }
      }
    },
    goRegister() {
      this.$router.push("/register");
    },
    link() {
      this.show = true;
      this.message = "工程师正在努力实现中~";
      setTimeout(() => {
        this.show = false;
        this.message = "";
      }, 1000);
    },
    getCode() {
      // 用随机数来充当验证码
      this.checkCode = parseInt(Math.random() * 1000000);
      this.show = true;
      this.message = `您的验证码为 ${this.checkCode} \t有效期为下一次验证码前`;
      setTimeout(() => {
        this.show = false;
        this.message = "";
      }, 10000);
    },
    methodWd() {
      this.method = "passwd";
    },
    methodCode() {
      this.method = "code";
    }
  }
};
</script>

<style>
.Toast {
  top: 10%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  z-index: 99999;
  background-color: rgb(218, 81, 81);
  color: #333;
  box-shadow: none;
  border: none;
  border-radius: 4px;
  padding: 22px;
  font-size: 14px;
}
@keyframes background-move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
}
.container {
  width: 100vw;
  height: calc(100vh - 49px);
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgb(240, 135, 86),
    rgb(182, 240, 90),
    hsl(190deg, 80%, 70%),
    hsl(250deg, 80%, 70%),
    hsl(320deg, 80%, 70%)
  );
  background-size: 200% 200%;

  animation: background-move 5s infinite alternate;
}
.other-sign {
  flex: 1;
  font-size: 1.2rem;
  font-weight: 400;
  color: #3d5245;
  cursor: pointer;
  align-self: center;
  height: 20%;
  display: flex;
}
.other-sign div {
  width: 50px;
  height: 1px;
  background-color: rgb(80, 79, 79);
  align-self: center;
}
.other-sign span {
  align-self: center;
  margin: 0 14px;
}

.link {
  height: 40px;
  width: 100%;
  align-self: center;
  display: flex;
  justify-content: center;
}
.link span {
  color: rgb(90, 90, 197);
  margin: 0 4px;
  font-size: 34px;
}

.login-form {
  align-self: center;
  /* width: 100vw;
  height: 100vh; */
  width: 100vw;
  /* height: 240px; */
  height: 80%;
  align-self: flex-end;

  display: flex;
  flex-direction: column;
  padding: 0 40px;
  padding-top: 20vh;
  text-align: center;
  position: relative;
  z-index: 100;
  background: inherit;
  overflow: hidden; /* 隐藏多余的模糊效果 */
}

.login-form::before {
  content: "";
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  position: absolute;
  top: -10px;
  left: -10px;
  overflow: hidden;
  background: inherit;
  box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.25);
  filter: blur(6px);
  z-index: -1;
}

.login-form h2 {
  font-size: 1rem;
  font-weight: 400;
  color: #3d5245;
  cursor: pointer;
}

.login-form input,
.login-form button {
  margin: 12px 2px;
  height: 36px;
  border: none;
  /* background-color: rgba(255, 255, 255, 0.3); */
  background-color: inherit;
  padding: 0 14px;
  color: #3d5245;
}
/* .login-form button {
  border-radius: 18px;
} */
.login-form input {
  border-bottom: 1px solid #333;
}

.login-form input::placeholder {
  font-size: 1rem;
  color: #3d5245;
}

/* 补充，取消选中高亮蓝框 */
.login-form button:focus,
.login-form input:focus {
  outline: 0;
}

.login-form button {
  border-radius: 18px;
  width: 40vw;
  align-self: center;
  margin: 14px 0;
  background-color: rgba(57, 88, 69, 0.4);
  color: white;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: 0.4s;
}

.login-form button:hover {
  background-color: rgba(12, 80, 38, 0.67);
}

.login-form button:focus {
  outline: 0;
}

.login-form button::before,
.login-form button::after {
  content: "";
  display: block;
  width: 80px;
  height: 100%;
  background: rgba(179, 255, 210, 0.5);
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  transform: skewX(-15deg);
  filter: blur(30px);
  overflow: hidden;
  transform: translateX(-100px);
}

.login-form button::after {
  width: 40px;
  background: rgba(179, 255, 210, 0.3);
  left: 60px;
  opacity: 0;
  filter: blur(5px);
}

.login-form button:hover::before {
  transition: 1s;
  transform: translateX(320px);
  opacity: 0.7;
}

.login-form button:hover::after {
  transition: 1s;
  transform: translateX(320px);
  opacity: 1;
}
.sign-by-code {
  position: relative;
}
.sign-by-code button {
  position: absolute;
  right: 2rem;
  bottom: 0;
  padding: 0;
  /* width: 60px; */
  font-size: 14px;
  /* transform: translateX(calc(-100% + 20px)); */
  background-color: inherit;
  color: rgb(221, 45, 45);
}
.sign-method {
  margin: 18px;
  font-size: 14px;
}
.sign-method span {
  margin: 0 8px;
}
</style>
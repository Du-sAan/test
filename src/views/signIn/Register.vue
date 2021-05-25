<template>
  <div class="container">
    <form class="login-form">
      <h2>注 册 界 面</h2>
      <input type="text" name="username" v-model="username" placeholder="用户名" />
      <input type="password" name="password" v-model="passwd" placeholder="密码" />
      <input type="text" name="phone" v-model="phone" placeholder="手机" />
      <input type="text" name="email" v-model="email" placeholder="邮箱" />
      <button type="button" @click="register">注册</button>
    </form>
    <toast :show="show" :message="message" />
  </div>
</template>

<script>
import Toast from "components/common/toast/Toast.vue";
import profile from "network/profile_request.js";
export default {
  name: "Register",
  data() {
    return {
      message: "",
      show: false,
      username: "",
      passwd: "",
      phone: "",
      email: "",
      // 简单的手机/用户名/邮箱正则测试,用户名必须是非空字符
      usernameReg: /.+/, //至少一个字符
      passwdReg: /.{3,16}/, //3-16位字符
      phoneReg: /^1\d{10}/, //以1开头的11位数组
      emailReg: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/ //网上抄的
    };
  },
  components: {
    Toast
  },
  methods: {
    // 用sessionStorage模拟注册
    register() {
      const userInfo = {
        username: this.username,
        passwd: this.passwd,
        phone: this.phone,
        email: this.phone
      };
      // 用户名格式校验
      if (!this.usernameReg.test(this.username)) {
        this.show = true;
        this.message = "用户名格式为至少一个字符";
        setTimeout(() => {
          this.show = false;
          this.message = "";
        }, 1000);
        return;
      }
      // 密码格式校验
      if (!this.passwdReg.test(this.passwd)) {
        this.show = true;
        this.message = "密码格式为3-16字符";
        setTimeout(() => {
          this.show = false;
          this.message = "";
        }, 1000);
        return;
      }
      // 手机号格式
      if (!this.phoneReg.test(this.phone)) {
        this.show = true;
        this.message = "手机格式不正确";
        setTimeout(() => {
          this.show = false;
          this.message = "";
        }, 1000);
        return;
      }
      // 邮箱格式
      if (!this.emailReg.test(this.email)) {
        this.show = true;
        this.message = "邮箱格式不正确";
        setTimeout(() => {
          this.show = false;
          this.message = "";
        }, 1000);
        return;
      }

      // 发送请求，注册用户
      let isRegister = profile.register(userInfo);
      isRegister.then(res => {
        console.log("---用户注册", res);
        if (res.data.isReigstered) {
          this.show = true;
          this.message = "注册成功";
        } else {
          this.show = true;
          this.message = "手机号已注册";
        }
        setTimeout(() => {
          this.show = false;
          this.message = "";
          this.$router.push("/signin");
        }, 2000);
      });
    }
  }
};
</script>

<style>
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
.login-form {
  align-self: center;
  /* width: 100vw;
  height: 100vh; */
  width: 100vw;
  min-width: 320px;
  /* height: 240px; */
  height: 100%;
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
</style>
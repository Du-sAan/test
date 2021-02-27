<template>
  <div class="container">
    <form class="login-form">
      <h2>注 册 界 面</h2>
      <input type="text" name="username" v-model="username" placeholder="用户名"/>
      <input type="password" name="password" v-model="padsswd" placeholder="密码" />
      <input type="text" name="phone" v-model="phone" placeholder="手机">
      <button @click="register">注册</button>
      
    </form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data () {
    return {
      username: "",
      passwd : "",
      phone : "",
      // 简单的手机/用户名正则测试,用户名必须是非空字符
      usernameRge: /.+/,
      phoneReg : /^1\d{10}/,
    }
  },
  methods: {
    // 用sessionStorage模拟登录
    register(){

    }
  }
};
</script>

<style>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
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
  width: 240px;
  height: 220px;
  display: flex;
  flex-direction: column;
  padding: 8px 40px;
  text-align: center;
  position: relative;
  z-index: 100;
  background: inherit;
  border-radius: 18px;
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
  margin: 4px 0 ;
  font-size: 1rem;
  font-weight: 400;
  color: #3d5245;
}

.login-form input,
.login-form button {
  margin: 6px 0;
  height: 36px;
  border: none;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 0 14px;
  color: #3d5245;
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
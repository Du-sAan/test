import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
// 配置图片懒加载插件
Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('assets/img/profile/avatar.jpeg')
})
// 引用mock,拦截登录请求，返回自定义的数据
require("./mock/mock.js")
// 添加事件总线
Vue.prototype.$bus = new Vue();


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


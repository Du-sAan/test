import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
// 配置懒加载插件
Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('assets/img/common/placeholder.png')
})

// 添加事件总线
Vue.prototype.$bus = new Vue();


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

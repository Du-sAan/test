import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routes = [
  // 默认路径
  {
    path : "",
    redirect: "/home"
  },
  // home
  {
    path : "/home",
    component : () => import("../views/home/Home.vue")
  },
  // cat
  { 
    path: '/cat',
    component: () => import("../views/cat/Cat.vue")
  },
  // profile
  { 
    path: '/profile',
    component: () => import("../views/profile/Profile.vue")
  },
  // category
  { 
    path: '/category',
    component: () => import("../views/category/Category.vue")
  }

]

const router =  new Router({
  routes,
  mode : "history"
})


// 解决重复点击，即重复跳转到同一个url时，控制台报错的问题
const RouterPush = Router.prototype.push
Router.prototype.push = function push(to){
  return RouterPush.call(this,to).catch(err =>err)
}
export default router
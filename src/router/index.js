import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = () => import("views/home/Home.vue")
const Cat = () => import("views/cart/Cat.vue")
const Profile = () => import("views/profile/Profile.vue")
const Category = () => import("views/category/Category.vue")
const Detail = () => import("views/detail/Detail.vue")
const DetailParamInfo = () => import('views/detail/childComps/DetailParamInfo.vue')
const DetailCommentInfo =  () => import('views/detail/childComps/DetailCommentInfo.vue')
const DetailBaseInfo = () => import("views/detail/childComps/DetailBaseInfo.vue")
const DetailRecommendInfo = () => import("components/content/goods/GoodsList.vue")
  const routes = [
  // 默认路径
  {
    path: "",
    redirect: "/home"
  },
  // home
  {
    path: "/home",
    component: Home,
  },
  // cat
  {
    path: '/cat',
    component: Cat
  },
  // profile
  {
    path: '/profile',
    component: Profile
  },
  // category
  {
    path: '/category',
    component: Category
  },
  {
    path : "/detail",
    component : Detail,
    children : [
      {
        path : "",
        redirect: "/detail/baseInfo"
      },
      {
        path : "baseInfo",
        components: DetailBaseInfo 
      },
      {
        path : "paramInfo",
        component : DetailParamInfo
      },
      {
        path : "commentInfo",
        component : DetailCommentInfo
      },
      {
        path : "recommendInfo",
        component : DetailRecommendInfo
      }
    ]
  }

]

const router = new Router({
  routes,
  mode: "history"
})


// 解决重复点击，即重复跳转到同一个url时，控制台报错的问题
const RouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return RouterPush.call(this, to).catch(err => err)
}
export default router
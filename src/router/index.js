import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = () => import("views/home/Home.vue")
const Cart = () => import("views/cart/Cart.vue")
const Profile = () => import("views/profile/Profile.vue")
const Category = () => import("views/category/Category.vue")
const Detail = () => import("views/detail/Detail.vue")
const SignIn = () => import("views/signIn/SignIn.vue")
const Register = () => import("views/signIn/Register.vue")
const Settlement = () => import("views/settlement/Settlement.vue")
const DetailGoods = () => import("views/detail/childComps/DetailGoods.vue")
const DetailParamInfo = () => import('views/detail/childComps/DetailParamInfo.vue')
const DetailCommentInfo = () => import('views/detail/childComps/DetailCommentInfo.vue')
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
    meta : {
      title : "主页"
    }
    
  },
  // cart
  {
    path: '/cart',
    component: Cart,
    meta : {
      title : "购物车"
    }
  },
  // profile
  {
    path: '/profile',
    component: Profile,
    meta : {
      title : "个人信息"
    }
  },
  // category
  {
    path: '/category',
    component: Category,
    meta : {
      title : "更多商品"
    }
  },
  // detail
  {
    path: "/detail",
    component: Detail,
    meta : {
      title : "商品详情页" 
    },
    children: [
      {
        path: "",
        redirect: "/detail/DetailGoods/"
      },
      {
        path: "DetailGoods",
        component: DetailGoods,
        meta : {
          title : "店铺信息"
        }
      },
      {
        path: "DetailParamInfo",
        component: DetailParamInfo,
        meta : {
          title : "参数详情"
        }
      },
      {
        path: "CommentInfo",
        component: DetailCommentInfo,
        meta : {
          title : "商品评论"
        }
      },
      {
        path: "RecommendInfo",
        component: DetailRecommendInfo,
        meta : {
          title : "推荐列表"
        }
      }
    ]
  },
  {
    path: "/settlement",
    component: Settlement,
    meta : {
      title : "收藏"
    }
  },
  // 登录和注册路由
  {
    path: "/signIn",
    component: SignIn,
    meta : {
      title : "登录"
    }
  },
  {
    path: "/register",
    component: Register,
    meta :{
      title : "注册"
    }
  },
  {
    path: "*",
    component: Home,
    meta : {
      title : "主页"
    }
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
router.beforeEach((to, from, next) => {
  // 从from -> to
  document.title = to.matched[0].meta.title
  // 需要验证权限的一些路由
  let auth = ['/user/username', '/user/password', '/user/birthday'];
  if (auth.includes(to.fullPath)) {
    // 做验证操作,如果携带token，则通行
    console.log("验证token");
  }
  next();
})
export default router
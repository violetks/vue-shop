import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/login/Login.vue'
// import Home from '../views/login/Home.vue'
// import Welcome from '../views/login/Welcome.vue'
// import Users from '../views/user/Users.vue'
// import Rights from '../views/power/Rights.vue'
// import Roles from '../views/power/Roles.vue'
// import List from '../views/goods/List.vue'
// import Params from '../views/goods/Params.vue'
// import Cate from '../views/goods/Cate.vue'
// import Add from '../views/goods/Add.vue'
// import Order from '../views/order/Order.vue'
// import Report from '../views/report/Report.vue'

const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/login/Login.vue')
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/login/Home.vue')
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../views/login/Welcome.vue')

const Users = () => import(/* webpackChunkName: "users_rights_roles" */ '../views/user/Users.vue')
const Rights = () => import(/* webpackChunkName: "users_rights_roles" */ '../views/power/Rights.vue')
const Roles = () => import(/* webpackChunkName: "users_rights_roles" */ '../views/power/Roles.vue')

const List = () => import(/* webpackChunkName: "list_params_cate" */ '../views/goods/List.vue')
const Params = () => import(/* webpackChunkName: "list_params_cate" */ '../views/goods/Params.vue')
const Cate = () => import(/* webpackChunkName: "list_params_cate" */ '../views/goods/Cate.vue')

const Add = () => import(/* webpackChunkName: "add_order_report" */ '../views/goods/Add.vue')
const Order = () => import(/* webpackChunkName: "add_order_report" */ '../views/order/Order.vue')
const Report = () => import(/* webpackChunkName: "add_order_report" */ '../views/report/Report.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'    // 重定向，访问根路径时自动跳转到登录页
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/goods', component: List },
      { path: '/goods/add', component: Add },
      { path: '/params', component: Params },
      { path: '/categories', component: Cate },
      { path: '/reports', component: Report },
      { path: '/orders', component: Order }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行   next('/login') 强制跳转
  if (to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token')  // 获取token
  if (!tokenStr) return next('/login')
  next()
})

export default router

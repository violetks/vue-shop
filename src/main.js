import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import '../mock/'
import './assets/css/global.css'   // 导入全局样式表
import './assets/fonts/iconfont.css'  // 导入字体图标
import axios from 'axios'

// 配置请求根路径
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'

const Mock = require('mockjs')

var token = Mock.mock(
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1MTI1NDQyOTksImV4cCI6MTUxMjYzMDY5OX0.eGrsrvwHm-tPsO9r_pxHIQ5i5L1kX9RX444uwnRGaIM'
)

// 通过axios请求拦截器添加token，保证拥有获取数据的权限
axios.interceptors.request.use(config => {
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem(token)
  return config;
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

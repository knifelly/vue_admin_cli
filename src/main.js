import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {axios, axiosLoading} from '@plugins/axios';
import '@plugins/element.js'
import '@scss/base.scss'

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$axiosLoading = axiosLoading

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('ms_username');
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/403');
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

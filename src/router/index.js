import Vue from 'vue'
import Router from 'vue-router'
import { loadView, nextHandlar } from '@utils/index'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    name: 'home',
    component: loadView('public/Index'),
    children: [
      {
        path: 'home',
        name: 'home',
        meta: { title: '系统首页' },
        component: loadView('home/Index')
      },
      {
        path: '404',
        name: '404',
        meta: { title: '404' },
        component: loadView('home/Index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: loadView('login/Index')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

router.beforeEach((to, from, next) => nextHandlar(to, from, next, router))

export default router

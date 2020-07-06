import Vue from 'vue'
import VueRouter from './kvue-router'
import Home from '../views/Home.vue'

// 1、为什么用use方法？他做了什么？
// VueRouter是插件，使用插件必须使用use方法，我们写的插件会做为use的参数直接传过去
// use方法做了什么事情????
// 猜测:
// 在每个组件中,可以通过this.$router可以访问Router示例===>$router是怎么来的???===>与main.js挂载的router有关
// 在内部会做什么事情????? ===> 把main.js中设置的router设置到prototype上面去
// ===> this.$router 可以访问Router实例, 内部: Vue.prototype.$router
// 插件实现的第一个任务: 将$router挂载到Vue.prototype!!!!!
// 插件实现的第二个任务: 实现并且注册两个全局组件 router-view, router-link

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/test',
    name: 'Test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Test.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

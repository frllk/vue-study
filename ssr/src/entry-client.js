/**
 * 激活
 * 创建实例
 */
import { createApp } from './main'

// 激活
const { app, router, store } = createApp()

// 还原store.state ===>  状态同步 => 把状态从后端移到前端去
// renderer会把它放到window.__INITIAL_STATE__
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 注水操作 源码=> hydrate
router.onReady(() => {
  app.$mount('#app')
})

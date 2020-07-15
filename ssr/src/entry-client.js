/**
 * 激活
 * 创建实例
 */
import { createApp } from './main'

// 激活
const { app, router } = createApp()

// 注水操作 源码=> hydrate
router.onReady(() => {
  app.$mount('#app')
})

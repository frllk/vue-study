/**
 * 将来和渲染器打交道
 * 创建vue实例=>把vue实例渲染出来
 */

import { createApp } from './main'

export default context => {
  const { app, router } = createApp(context)
  // 异步 => 组件中可能有异步数据
  return new Promise((resolve, reject) => {
    // 跳转首屏地址去
    router.push(context.url)
    // 等待路由就绪
    router.onReady(() => {
      resolve(app)
    }, reject)
  })
}

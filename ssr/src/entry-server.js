/**
 * 将来和渲染器打交道
 * 创建vue实例=>把vue实例渲染出来
 */

import { createApp } from './main'

export default context => {
  const { app, router, store } = createApp(context)
  // 异步 => 组件中可能有异步数据
  return new Promise((resolve, reject) => {
    // 跳转首屏地址去
    router.push(context.url)
    // 等待路由就绪
    router.onReady(() => {
      // 判断是否存在asyncData选项
      // 获取匹配路由相关组件
      const comps = router.getMatchedComponents()
      // 遍历它们，并执行可能存在的asyncData
      Promise.all(comps.map(comp => {
        if (comp.asyncData) {
          return comp.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 数据已经存入store，只需要序列化它们，传到前端在复原
        // 设置到上下文中的state，renderer将来会转换它
        context.state = store.state
        // 返回实例
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}

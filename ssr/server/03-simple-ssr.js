// node server把页面渲染出来，但是希望用上vue的知识，用vue的方式把页面描述并且渲染出来
// 创建一个express实例
const express = require('express')
const app = express()
// 监听端口
app.listen(3000, () => {
  console.log('启动成功')
})

// 创建渲染器
const { createRenderer } = require('vue-server-renderer')
// 服务端开发通常不会是单例，会是一个工厂模式=>工厂函数生成实例
const renderer = createRenderer()

// 导入vue
const Vue = require('vue')
// 导入路由
const Router = require('vue-router')
Vue.use(Router)



// 路由
// 问题2：路由由express在管理
app.get('*', async (req, res) => {
  // 创建一个路由实例
  const router = new Router({
    routes: [
      { path: '/', component: { template: '<div>Index</div>' } },
      { path: '/detail', component: { template: '<div>detail</div>' } }
    ]
  })
  /**
   * 1.用户请求之后，创建一个vue实例描述页面
   * 2.用渲染器把页面渲染起来
   */
  // 1.构建渲染页面内容
  // 问题1：没办法交互
  // 问题3：同构开发问题 => 用vue方式开发，可以用webpack打包
  const vm = new Vue({
    router,
    data () {
      return {
        name: '村长真棒！'
      }
    },
    template: `
      <div>
        <router-link to="/">Index</router-link>
        <router-link to="/detail">Detail</router-link>
        <div>{{name}}</div>
        <router-view></router-view>
      </div>
    `
  })
  try {
    // 路由跳转
    router.push(req.url)
    // 2.渲染:得到html字符串 => 异步方法 => await
    const html = await renderer.renderToString(vm)
    // 发送回前端
    res.send(html)
  } catch (error) {
    res.status(500).send('服务器内部错误')
  }
})
/**
 * 问题：
 *
 */
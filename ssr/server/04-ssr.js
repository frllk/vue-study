// node server把页面渲染出来，但是希望用上vue的知识，用vue的方式把页面描述并且渲染出来
// 创建一个express实例
const express = require('express')
const app = express()


// 获取绝对地址
const resolve = dir => require('path').resolve(__dirname, dir)

// 静态服务
// 开放dis/client目录，关闭默认的index页面打开功能
app.use(express.static(resolve('../dist/client'), { index: false }))

// 创建渲染器
const { createBundleRenderer } = require('vue-server-renderer')

// 选项：
// 参数1：服务端的bundle
const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
  template: require('fs').readFileSync(resolve("../public/index.html"), "utf8"), // 宿主文件
  clientManifest: require(resolve("../dist/client/vue-ssr-client-manifest.json")) // 客户端清单
})

// 只做一件事 => 渲染
app.get('*', async (req, res) => {

  try {
    const context = {
      url: req.url
    }
    // 渲染:得到html字符串 => 异步方法 => await
    const html = await renderer.renderToString(context)
    // 发送回前端
    res.send(html)
  } catch (error) {
    res.status(500).send('服务器内部错误')
  }
})

// 监听端口
app.listen(3000, () => {
  console.log('启动成功')
})

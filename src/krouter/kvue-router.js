let KVue;
console.log(KVue)
/**
 * 插件
 * 1、要实现一个install方法
 */
class KVueRouter {
  constructor (options) {
    this.$options = options
    // 问题：current 不是响应式的，所以不能导致下面组件的刷新？？？？？
    // this.current = '/'

    // 响应式数据 ===> 是一种机制，当一个数据变化的时候，我们知道它的变化，而且可以让相关的使用它的视图重新去响应、渲染
    // 解决：源码中有一个隐藏的api,Vue.util.defineReactive ===> 内部执行的是Object.defineProperty
    const initial = window.location.hash.slice(1) || '/'
    KVue.util.defineReactive(this, 'current', initial)

    // 提前处理路由表避免每次都循环
    // 缓存路由映射关系： 缓存path和route映射关系
    // 思考：
    this.routeMap = {}
    this.$options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })
    // console.log(this.routeMap)
    // 监听事件 .bind(this)或者使用箭头函数
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))
  }
  // 事件的监听者是window，onHashChange。this.onHashChange需要绑定一下this

  onHashChange () {
    this.current = window.location.hash.slice(1)
    console.log(this.current)
  }
}
/**
 * install
 * @param {*} Vue 形参是vue的构造函数 ===> 怎么来的呢？？？ ===> vue把自己传进来的===> 在KVueRouter内部要使用这个构造函数，所以在这需要做一个引用
 */
KVueRouter.install = function (Vue) {
  // 保存构造函数 ===> 这个插件是一个独立的包，将来打包的时候不希望把Vue也打包进去，所以在这做一个引用关系
  KVue = Vue

  // 1. 挂载$router
  // 问题：install方法在调用use的时候会被执行===> 执行时刻：krouter/index.js中Vue.use()时执行（第15行），导入的时间点在main.js中（第4行），执行的时刻要比第12行的new Vue()的时刻要早, 还要从new Vue({}) 中把router拿出来
  // ===> 执行install方法的时候，要拿到 在下面才会创建的VueRouter实例（krouter/index.js 第33行），当执行的时候，这个实例还不存在。
  // install方法先执行，VueRouter实例后生成，如何拿到这个实例？？？？ ===> 全局混入 + 生命周期的钩子，在未来某个时刻延迟执行
  Vue.mixin({
    beforeCreate () {
      // 全局混入，将来在组件实例化的时候才执行
      // 此时，router实例是不是已经存在了？ ===> 已经存在
      // 注意：
      // ===> 全局混入，所有组件都会执行 ===> 只去对当前这个根实例进行处理，其他实例不做处理（只有根实例才有router，其他都没有）
      // 在生命周期的钩子中，this指的是组件实例
      // this.$options：可以获取组件实例的配置选项 （new Vue({选项})） ===>  可以拿到选项中的router ===> new Vue({ router, 其他选项})，router的作用：拿到创建的krouter的实例
      if (this.$options.router) {
        // 如果存在，则挂载
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  // 2. 实现两个全局组件
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    // h是createElement
    render (h) {
      // <a href="#/xxx"></a>

      // jsx语法也可以用，vue-cli配置的支持 ===> 不推荐,不建议，因为现在写的是通用插件，执行环节 不应该有限制， jsx需要专门的loader
      // return <a href = { '#' + this.to}>{this.$slots.default}</a>

      // 参数说明：h(tag, props, children)
      return h(
        'a',
        { attrs: { href: '#' + this.to } },
        this.$slots.default
      )
    }
  })
  // router-view是一个容器
  Vue.component('router-view', {
    render (h) {
      // 1.获取路由器实例 ===> 问题: ===> 切换路由，下面内容不变
      // const routes = this.$router.$options.routes
      // const current = this.$router.current
      // const route = routes.find(route => route.path === current)
      // const comp = route ? route.component : null

      // 优化：提前处理路由表
      const { routeMap, current } = this.$router
      const comp = routeMap[current] ? routeMap[current].component : null

      // 获取路由表  routes（krouter/index.js）根据path把component拿出来
      // path: '/', 拿到component，直接把组件传入
      return h(comp)
    }
  })
}
export default KVueRouter

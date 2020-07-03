/**
* 实现Store类
* 实现插件
* 实现一个install方法
*/

let KVue
// 实现Store类
class Store {
  constructor (options) {
    // 响应式的state：定义响应式数据的另外一种方式===>借鸡生蛋
    // 定义一个响应式的数据，挂载到this.state上
    // 问题：这种方法导致state直接就向外暴露了，这样的话，用户可能直接覆盖state，不安全
    // this.state = new KVue({
    //   data: options.state
    // })

    // 私有
    this._vm = new KVue({
      data: {
        $$state: options.state
      }
    })

    // 保存mutations
    this._mutations = options.mutations

    // 保存actions
    this._actions = options.actions

    this.getters = {}

    // 绑定this到store实例
    const store = this
    // this.commit = this.commit.bind(store)
    const { commit, action } = store
    this.commit = function boundCommit (type, payload) {
      commit.call(store, type, payload)
    }
    this.action = function boundAction (type, payload) {
      return action.call(store, type, payload)
    }

    // getters
    // 1.遍历用户传入getters所有key，动态赋值，其值应该是函数执行结果
    // 2.确保它是响应式的，使用Object.defineProperty(this.getters, key, { get(){} })
    // 3.优化：缓存结果，可以利用computed
    // Object.defineProperty(this.getters, 'doubleCounter', {
    //   get () {
    //     return options.getters.doubleCounter(store.state)
    //   }
    // })
    for (const key in options.getters) {
      // store.getters[key] = options.getters[key](store.state)
      Object.defineProperty(store.getters, key, {
        get: () => options.getters[key](store.state)
      })
    }
    console.log(store)
  }

  // 存取器：get、set
  // 对外暴露state属性 ===>  只读
  get state () {
    return this._vm._data.$$state
  }

  set state (v) {
    console.error('please use replaceState to reset state')
  }

  // commit(type, payload): 执行mutation，修改状态
  commit (type, payload) {
    // 根据type获取对应的mutation
    const entry = this._mutations[type]
    if (!entry) {
      console.error('unknown mutation type')
      return
    }
    entry(this.state, payload)
  }

  // 当有复杂业务时或者是异步任务时，要执行action
  // dispatch(type, payload)
  dispatch (type, payload) {
    const entry = this._actions[type]

    if (!entry) {
      console.error('unknown action type')
      return
    }

    // this：store实例
    return entry(this, payload)
  }
}
//  实现插件
function install (Vue) {
  KVue = Vue

  // 混入
  Vue.mixin({
    beforeCreate () {
      // this.$options： new Vue({options选项})
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

//  此处导出的对象理解为Vuex ===>  因为kstore/index.js 中使用方式是:new Vuex.Store({})
export default { Store, install }

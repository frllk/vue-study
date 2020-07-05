/**
 * KVue：框架构造函数
 *    - 执⾏初始化，对data执⾏响应化处理，kvue.js
 *    - 为$data做代理
 * Observer：执⾏数据响应化（分辨数据是对象还是数组）
 * Compile：编译模板，初始化视图，收集依赖（更新函数、watcher创建）
 *    - 初始化视图
 *      - 根据节点类型编译，compile.js
 *      - 编译插值，compile.js
 *      - 编译元素
 *    - 依赖收集
 *      - 视图中会⽤到data中某key，这称为依赖。同⼀个key可能出现多次，每次都需要收集出来⽤⼀个Watcher来维护它们，此过程称为依赖收集。多个Watcher需要⼀个Dep来管理，需要更新时由Dep统⼀通知。
 *      - 实现思路：
 *        - 1. defineReactive时为每⼀个key创建⼀个Dep实例
 *        - 2. 初始化视图时读取某个key，例如name1，创建⼀个watcher1
 *        - 3. 由于触发name1的getter⽅法，便将watcher1添加到name1对应的Dep中
 *        - 4. 当name1更新，setter触发时，便可通过对应Dep通知其管理所有Watcher更新
 * Watcher：执⾏更新函数（更新dom）
 * Dep：管理多个Watcher，批量更新
 */

function defineReactive(obj, key, val) {
  // val可能是对象，需要递归处理
  observe(val)

  // 每执行一次defineReactive，就会创建一个Dep实例， key和Dep之间一对一的关系
  const dep = new Dep()

  Object.defineProperty(obj, key, {
    get() {
      console.log('get', val)
      // 闭包：在defineReactive函数作用域内部，会产生很多闭包，key、val、dep由于get的关系，函数内部又有函数，把内部作用域里面的一些属性、变量暴露给外部，这是非常典型的闭包行为===>这些东西都会在内存中保存着，不会被释放===>每一次执行defineReactive的时候，内存中都会多一个key，多一个val，多一个dep，他们始终在内存中占据着一个地方，不会被消除掉===>利用闭包的特性，创建了一个一对一的关系， key和dep之间有准确的一对一关系!!!
      Dep.target && dep.addDep(Dep.target) // 依赖收集 涉及一个闭包，闭包的实际应用
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        observe(newVal)
        val = newVal
        console.log('set', newVal)
        // 通知更新

        // // 简单粗暴看结果法
        // watchers.forEach(w => w.update())
        // 值发生变化的时候，能精确的知道是那个管家去做操作
        dep.notify()
      }
    }
  })
}

// 对象响应式处理
function observe(obj) {
  // 判断obj类型必须是对象
  if (typeof obj !== 'object' || obj == null) return
  new Observer(obj)
}

// 将$data中的key代理到KVue实例上
function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(val) {
        vm.$data[key] = val
      }
    })
  })
}

class KVue {
  constructor(options) {
    // 保存选项
    this.$options = options
    this.$data = options.data
    this.$methods = options.methods
    console.log('创建KVue实例', this)
    // 响应化处理
    observe(this.$data)

    // 代理
    proxy(this)

    new Compile('#app', this)
  }
}

// 每一个响应式对象，伴生一个Observer实例
class Observer {
  constructor(value) {
    this.value = value
    // 判断value是obj还是数组
    this.walk(value)
  }
  walk(obj) {
    Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
  }
}

// 编译过程
// new Compile(el, vm)
class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    // 编译模板
    if (this.$el) {
      this.compile(this.$el)
    }
  }
  compile(el) {
    // 递归遍历el
    el.childNodes.forEach(node => {
      // 判断其类型
      if (this.isElement(node)) {
        console.log('编译元素', node.nodeName)
        this.compileElement(node)
      } else if (this.isInter(node)) {
        // console.log('编译插值表达式', node.textContent)
        this.compileText(node)
      }
      // 牵扯到树遍历的时候，不要忘了递归
      if (node.childNodes) {
        this.compile(node)
      }
    })
  }
  // 插值文本的编译
  compileText(node) {
    // 获取匹配表达式
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }
  // 编译元素
  compileElement(node) {
    // 获取节点属性
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      // k-xxx="aaa"
      const attrName = attr.name // k-xxx
      const exp = attr.value // aaa
      // if (this.idDirective(attrName)) {
      //   const dir = attrName.substring(2)
      //   // 执行指令
      //   this[dir] && this[dir](node, exp)
      // } else if (this.isEvent(attrName)) {
      //   // exp: onclick  click vm.options.
      //   console.log('isEvent', attrName.slice(1), exp)
      //   // this.$vm.$methods[exp]()
      //   this.hEvent(node, attrName.slice(1), this.$vm.$methods[exp].bind(this.$vm))
      // }
      if (this.isEvent(attrName)) {
        console.log(`event================${attrName}`)
        // exp: onclick  click vm.options.
        const eventName = attrName.startsWith('k-on:') ? attrName.slice(5) : attrName.slice(1)
        // this.$vm.$methods[exp]()
        this.hEvent(node, eventName, this.$vm.$methods[exp].bind(this.$vm))
      } else if (this.idDirective(attrName)) {
        const dir = attrName.substring(2)
        // 执行指令
        this[dir] && this[dir](node, exp)
      }
    })
  }
  // 文本指令
  text(node, exp) {
    console.log('node, exp', node, exp)
    node.textContent = this.$vm[exp]
    this.update(node, exp, 'text')
  }
  html(node, exp) {
    node.innerHTML = this.$vm[exp]
    this.update(node, exp, 'html')
  }
  model(node, exp) {
    console.log('model=====', node, exp, node.value, this)
    node.value = this.$vm[exp]
  }
  // 事件处理
  hEvent(node, type, fn) {
    if (type == 'input') {
      const attr = Array.from(node.attributes).filter(attr => attr.name.startsWith('k-model'))
      const exp = attr[0].value
      console.log('inputinput===', attr, exp)
    }
    console.log('hEvent', type, node)
    node.addEventListener(type, fn)
  }


  // 所有动态绑定都需要创建更新函数以及对应的watcher实例
  update(node, exp, dir) {
    // textUpdater()
    // 初始化
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])
    // 更新
    new Watcher(this.$vm, exp, function (val) {
      fn && fn(node, val)
    })
  }
  textUpdater(node, value) {
    node.textContent = value
  }
  htmlUpdater(node, value) {
    node.innerHTML = value
  }

  // 元素
  isElement(node) {
    return node.nodeType === 1
  }
  // 插值表达式 {{xxx}}
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
  // 判断是否为指令
  idDirective(attrName) {
    return attrName.indexOf('k-') === 0
  }
  // 判断是否为事件
  isEvent(attrName) {
    return attrName.startsWith('k-on:') || attrName.startsWith('@')
  }
}

// Watcher: 小秘书，界面中的一个依赖对应一个小秘书
// const watchers = []  简单粗暴看效果法
class Watcher {
  // vm: 当前的kvue实例；key：关联的key是谁？是name1还是name2... updateFn：发生变化时，要更新谁，需要一个更新函数
  constructor(vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn

    // watchers.push(this)

    // 读一次数据，触发defineReactive里面的get(), 让当前的这个实例和相关的dep关联起来
    Dep.target = this  // 把this挂载到Dep.target上
    this.vm[this.key]  // 触发get去收集
    Dep.target = null  // 事情收集完之后，置空
  }
  // 更新函数，管家调用（所有Watcher实例有一个统一的大管家管理）
  update() {
    // 传入当前的最新值给更新函数
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}

class Dep {
  constructor() {
    this.deps = []
  }
  addDep(watcher) {
    this.deps.push(watcher)
  }
  notify() {
    this.deps.forEach(wather => wather.update())
  }
}
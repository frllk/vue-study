function defineReactive(obj, key, val) {
  // val可能是对象，需要递归处理
  observe(val)

  // 依赖收集，创建Dep实例
  const dep = new Dep()

  Object.defineProperty(obj, key, {
    get() {
      console.log('get', val)
      // console.log('Dep.target', Dep.target)
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        observe(newVal)
        val = newVal
        console.log('set', newVal)
        // // 简单粗暴看结果法
        watchers.forEach(w => w.update())
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

class FVue {
  constructor(options) {
    this.$option = options
    this.$data = options.data

    // 1.对数据进行响应式处理,
    observe(this.$data)
    console.log(this)
    // 为$data做代理,将$data中的key代理到KVue实例上
    proxy(this)

    // 2.模板编译: 编译模板，初始化视图，收集依赖（更新函数、watcher创建）
    new Compile(options.el, this)
  }
}
//*******************************数据处理 start**********************************//
// 为$data做代理：将$data中的key代理到KVue实例上
function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(newVal) {
        vm.$data[key] = newVal
      }
    })
  })
}

// 劫持监听所有属性
// 执⾏数据响应化（分辨数据是对象还是数组）
class Observer {
  constructor(value) {
    this.value = value
    this.walk(value)
  }
  walk(obj) {
    Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
  }
}
//*******************************数据处理 end************************************//

//*******************************模板编译 start**********************************//
// 编译 - Compile: 编译模板中vue模板特殊语法，初始化视图、更新视图
class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    if (this.$el) {
      this.compile(this.$el)
    }
  }
  // 根据节点类型编译，compile.js
  compile(el) {
    const childNodes = el.childNodes
    console.log(Array.from(childNodes))
    Array.from(childNodes).forEach(node => {
      if (this.isElement(node)) {
        // 编译元素
        console.log('编译元素', node.nodeName)
        this.compileElement(node)
      } else if (this.isInterpolation(node)) {
        // 编译插值文本
        console.log('编译插值文本', node.textContent)
        this.compileText(node)
      }
      // 如果有子节点，则编译子节点
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }
  // 判断是否是元素
  isElement(node) {
    return node.nodeType == 1
  }
  // 判断是否是文本
  isInterpolation(node) {
    return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
  // 编译插值文本 ===========编写更新函数、创建watcher
  compileText(node) {
    console.log(RegExp.$1, this)
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }
  // 编译元素
  compileElement(node) {
    // <p k-text="counter"></p>
    console.log('compileElement node:', node)
    // k-text
    let nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      console.log(attr)
      let attrName = attr.name
      let exp = attr.value
      // console.log(`attrName:${attrName}   exp:${exp}`)
      if (this.isDirective(attrName)) {
        let dir = attrName.substring(2) // text  html  model
        // console.log(`attrName:${attrName}   exp:${exp}   dir:${dir}`)
        this[dir] && this[dir](node, exp)
      }
    })
  }
  // 判断是否为指令
  isDirective(attr) {
    return attr.indexOf('k-') == 0
  }
  // k-text 处理
  text(node, exp) {
    node.textContent = this.$vm[exp]
    this.update(node, exp, 'text')
  }
  // k-html 处理
  html(node, exp) {
    node.innerHTML = this.$vm[exp]
    this.update(node, exp, 'html')
  }
  // 所有动态绑定都需要创建更新函数以及对应的watcher实例
  update(node, exp, dir) {
    console.log(`node:${node}   exp:${exp}   dir:${dir}`)
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])
    new Watcher(this.$vm, exp, function (val) {
      fn && fn(node, val)
    })
  }
  textUpdater(node, val) {
    node.textContent = val
  }
  htmlUpdater(node, val) {
    node.innerHTML = val
  }
}


//*******************************模板编译 end************************************//
//*******************************依赖收集 start**********************************//
// 视图中会⽤到data中某key，这称为依赖。同⼀个key可能出现多次，每次都需要收集出来⽤⼀个
// Watcher来维护它们，此过程称为依赖收集。
// 多个Watcher需要⼀个Dep来管理，需要更新时由Dep统⼀通知。
const watchers = [] // 简单粗暴 ，用于直接看效果
// 监听器：负责更新视图, Watcher: 小秘书，界面中的一个依赖对应一个小秘书
class Watcher {
  // vm: 当前的kvue实例；key：关联的key是谁？是name1还是name2... updateFn：发生变化时，要更新谁，需要一个更新函数
  constructor(vm, key, updateFn) {
    // FVue实例
    this.vm = vm
    // 依赖key
    this.key = key
    // 更新函数
    this.updateFn = updateFn

    // watchers.push(this)


    // 创建watcher时触发getter
    // 读一次数据，触发defineReactive里面的get(), 让当前的这个实例和相关的dep关联起来
    Dep.target = this  // 把this挂载到Dep.target上
    this.vm[this.key]  // 触发get去收集
    Dep.target = null  // 事情收集完之后，置空
  }
  // 更新
  update() {
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}
//*******************************依赖收集 end************************************//
//*******************************声明Dep end************************************//
class Dep {
  constructor() {
    this.deps = []
  }
  addDep(watcher) {
    this.deps.push(watcher)
  }
  notify() {
    this.deps.forEach(watcher => watcher.update())
  }
}
//*******************************声明Dep end************************************//

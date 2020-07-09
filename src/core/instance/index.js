import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'


// +++真正的构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }

  // +++ 初始化
  this._init(options)
}

// +++ 实例方法的初始化
initMixin(Vue) // +++ 混入了_init()
stateMixin(Vue) // +++ 和状态相关的初始化方法:$set $del $watch
eventsMixin(Vue) // +++ $emit/$on/$off/$once
lifecycleMixin(Vue) // +++ $_update / $forceUpdate /$destroy
renderMixin(Vue) // +++ $nextTick _render

export default Vue

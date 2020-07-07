/**
 * 传入一个组件配置
 * 创建它的实例，并且将它挂载到body上
 */

import Vue from 'vue';
/**
 * 返回组件实例
 * @param {*} Component 组件
 * @param {*} props 参数
 */
export default function create (Component, props) {
  /**
   * 实例创建
   * 1.方式一：Vue.extend()
   *  - 作业：使用extend()方式创建组件实例并挂载
   * 2.方式二：借鸡生蛋
   */

  const vm = new Vue({
    render (h) {
      return h(Component, { props })
    }
  }).$mount() // 不能在里面直接写body，因为在挂载的时候是一种覆盖行为。如果想额外的往其他地方挂，可以单独的去使用一下,像dom操作，让它去做这件事情。 $mount() 本质上将vdom=>dom

  // 通过vm.$el获取生成的dom
  document.body.appendChild(vm.$el)
  // 淘汰机制：删除函数
  // 获取组件实例
  const comp = vm.$children[0]
  comp.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }
  return comp
}

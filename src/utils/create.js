import Vue from 'vue' // 老母鸡
// 传入一个组件的配置
// 创建它的实例，并且将它挂载到body上 ===========  作业
// create函数本质：返回组件实例
export default function create (Component, props) {
  // 实例创建
  // 作业：使用extend方法创建组件实例并挂载
  // extend方法返回的是组件的构造函数
  const Ctor = Vue.extend(Component)
  const comp = new Ctor({
    propsData: props
  }).$mount()
  document.body.appendChild(comp.$el)
  comp.remove = () => {
    document.body.removeChild(comp.$el)
    comp.$destroy()
  }
  // // 方式二：借鸡生蛋 render
  // // 将实例的根组件设置成Component, 并挂载到body上
  // const vm = new Vue({
  //   render (h) {
  //     return h(Component, { props })
  //   }
  // }).$mount() // 不能直接在里面写body  $mount是覆盖行为
  // // $mount() 本质上将vdom===> dom  将虚拟dom转为真实dom

  // // 通过vm.$el获取生成的dom
  // document.body.appendChild(vm.$el)

  // // 删除函数
  // // 获取组件实例
  // const comp = vm.$children[0]

  // // 未来不需要的时候销毁掉
  // comp.remove = () => {
  //   document.body.removeChild(vm.$el)
  //   vm.$destroy()
  // }
  return comp
}

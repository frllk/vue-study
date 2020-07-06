<template>
  <div class="child1" @click="$emit('some-event', 'msg from child1')">
    <h3>child1 = grandson</h3>
    <p>{{msg}}</p>
    <p>子父传值$emit/props，点我有惊喜~~</p>
  </div>
</template>

<script>
export default {
  name: 'Child1',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  mounted () {
    // this.$bus.$on('event-from-child2', msg => {
    //   console.log('Child1:', msg);
    // });
    // 事件处理（典型的发布订阅模式，发布者和订阅者通常是同一个角色）
    // 事件的派发者和监听这通常是一个
    // 在今天的例子中：
    // 可以使用Child1和Child2共同的中间人来做一个桥梁，照样可以进行通信
    this.$parent.$on('event-from-child2', msg => {
      console.log('Child1:', msg)
    })
  }
}
</script>

<style scoped>
.child1 {
  background-color: pink;
}
</style>

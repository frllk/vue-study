<template>
  <div class="child2">
    <h3>child2 = grandson</h3>
    <!-- $attrs: 跨层级通信，比如爷孙之间的通信 -->
    <p>{{$attrs.msg}}</p>
    <!-- inject/provide -->
    <p>{{bar1}}</p>
    <button @click="sendToChild1">给child1发送消息</button>
  </div>
</template>

<script>
export default {
  name: 'Child2',
  // inject: ['bar'], // 类似于props  隔代传值
  // inject/provide进来的数据不是响应式的，可以传一个响应式的引用类型进来
  inject: {
    // 避免和data中数据重名可以起别名
    bar1: {
      from: 'bar',
      default: 'barrrr'
    }
  },
  methods: {
    sendToChild1() {
      // 利用事件总线发送事件
      // this.$bus.$emit('event-from-child2', 'some msg from child2')
      this.$parent.$emit(
        'event-from-child2',
        'some msg from child2，兄弟组件之间通信可通过共同祖辈搭桥，$parent或$root。'
      )
      this.$emit('foo')
    }
  }
}
</script>

<style scoped>
.child2 {
  background-color: skyblue;
  padding: 10px;
  border-radius: 5px;
}
</style>

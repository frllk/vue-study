<template>
  <div class="communication">
    <h2>组件通信 = grandpa</h2>
    <!-- props, 自定义事件 -->
    <Child1 msg="some msg from parent" @some-event="onSomeEvent"></Child1>
    <!-- 事件总线 -->
    <Child2 ref="child2" msg="$attrs：some message from index！！！"></Child2>

    <Parent msg="message from grandpa" data="data" @foo="onFoo"></Parent>
  </div>
</template>

<script>
import Child1 from '@/components/communication/Child1.vue'
import Child2 from '@/components/communication/Child2.vue'
import Parent from '@/components/communication/Parent.vue'
export default {
  provide() {
    return {
      bar:
        'bar~~~ （provide/inject：跨级传参，隔代传值，能够实现祖先和后代之间传值）'
    }
  },
  components: {
    Child1,
    Child2,
    Parent
  },
  methods: {
    onSomeEvent(msg) {
      console.log('Communition-index:', msg)
    },
    onFoo() {
      console.log('Communition-index === msg from Child2')
    }
  },
  mounted() {
    // 在父组件中调用子组件child2里面的方法
    console.log(this, this.$children)
    // $children不能保证元素顺序
    // this.$children[1].sendToChild1();
    console.log(
      '⽗组件可以通过$children访问⼦组件实现⽗⼦通信, index调用child2中方法sendToChild1'
    )
    /**
     * $children和$refs的区别
     * $children中只能是自定义组件,$children不能保证元素顺序(组件可能是异步组件)
     * $refs：dom元素也可以
     */

    this.$refs.child2.sendToChild1()
  }
}
</script>

<style scoped>
.communication {
  border: 2px dotted red;
  padding: 5px;
}
.communication > div {
  border: 2px solid #ccc;
  border-radius: 5px;
  margin: 10px 0;
  padding: 10px;
}
</style>

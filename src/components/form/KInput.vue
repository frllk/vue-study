<template>
  <div>
    <!-- 管理数据，实现双向绑定 -->
    <!-- 实现:value, @input -->
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
export default {
  inheritAttrs: false, // 默认继承下来的特性会在跟标签上面进行显示，关闭即可
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput (e) {
      // 把自己当前最新的值派发出去即可，实现这个事件的派发，将来在外面可以对这个值进行赋值
      this.$emit('input', e.target.value)
      // 触发校验：当数值发生变化的时候，要通知大家做校验
      // 思考：触发不同的事件进行校验如何做？？？ 比如blur等
      // 上一级是插槽，不能在slot加事件，所以通过$parent发事件
      this.$parent.$emit('validate')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div>
    <input :value="value" :type="type" v-bind="$attrs" @input="onInput">
  </div>
</template>

<script>
/**
 * 组件目标：管理数据，实现双向绑定
 * 语法糖：value，@input
 */
export default {
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput (e) {
      this.$emit('input', e.target.value)
      // 什么时候触发校验？？？ 思考：blur校验应该如何做？
      // 触发校验 ===> 思考：如何避免如下这种耦合度高的问题
      this.$parent.$emit('validate')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

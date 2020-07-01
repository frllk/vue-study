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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

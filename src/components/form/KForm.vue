<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
/**
 * 表单要做那些事情
 * 1. 需要一些对外的api
 *    props: model：数据, rules：校验规则
 * 2、对外提供一个全局校验方法
 *    validate()
 * 3、隐藏的第三件事情：
 */
export default {
  provide () {
    return {
      form: this // 这里传递的是表单组件的实例本身，传了一个响应式的对象
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: Object
  }
}
</script>

<style lang="scss" scoped>

</style>

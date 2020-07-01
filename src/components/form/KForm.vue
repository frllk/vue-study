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
  },
  methods: {
    validate (cb) {
      // 全局校验方法 ===> 统一调用，执行所有选项的校验方法 ===> 将来需要告诉外界是否校验通过
      // 1、执行内部所有KFormItem校验方法，统一处理结果
      // 思考：KFormItem外层可能还会套别的组件？？？？？？？？？？
      // 不健壮写法：
      // 把children数组转换为promise数组，所以用map

      // 将FormItem数组转换为Promise数组
      const tasks = this.$children.filter(item => item.prop).map(item => item.validate())

      // 2、统一检查校验结果
      // Promise.all(tasks).then(() => cb(new Error(true))).catch(() => cb(new Error(false)))
      Promise.all(tasks).then(() => cb(true)).catch(() => cb(false))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

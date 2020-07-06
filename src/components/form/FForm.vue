<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
/**
 * 目标：需要一些对外的api
 * 1.需要一些属性，props: model(数据)，rules(校验规则)
 * 2.需要对外提供一个全局校验方法，validate()
 * 3.
 */
export default {
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: Object
  },
  methods: {
    validate (cb) {
      // 全局校验方法, 统一调用 ===>  告诉外界是否校验成功
      // 1.执行内部所有FormItem校验方法，统一处理结果
      // 思考：不建壮写法，因为可能在FFormItem外层在包别的组件
      // 希望把this.$children数组转为promise数组，所以用map
      // 将FormItem数组转换为Promise数组
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate())
      //  2.统一检查校验结果
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <div>
    <!-- 1.显示label标签: 属性 -->
    <label v-if="label">{{label}}</label>
    <!-- 2.显示内部表单元素 - kInput => 插槽占位 -->
    <slot></slot>
    <!-- 3.错误提示信息：自己的数据 -->
    <div v-if="error" class="error">{{error}}</div>
    <!-- <p>{{form.model[prop]}}</p> -->
  </div>
</template>

<script>
/**
 * 目标：
 * 1.显示label标签
 * 2.显示内部表单元素 - kInput => 插槽占位
 * 3.错误提示信息
 */
// 当前校验规则
import Schema from 'async-validator';
export default {
  inject: ['form'], // inject 把form注入进来
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // 状态，自己的状态，未来通过修改状态控制错误信息的显示
      error: ''
    }
  },
  mounted () {
    this.$on('validate', () => {
      this.validate()
    });
  },
  methods: {
    validate () {
      // 当前表单项校验
      // element使用的是async-validator
      // 获取校验规则和当前数据
      const rules = this.form.rules[this.prop]
      const value = this.form.model[this.prop]
      // 创建描述符/校验器  当前校验key：属性名称  值：对应的校验规则
      const schema = new Schema({ [this.prop]: rules })
      // 校验  接收将来要校验的值
      // 返回promise，全局可以统一处理
      return schema.validate({ [this.prop]: value }, errors => {
        // errors存在则校验失败
        if (errors) {
          console.log('errors', errors)
          this.error = errors[0].message
        } else {
          // 校验通过
          this.rules = ''
        }
      })
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>

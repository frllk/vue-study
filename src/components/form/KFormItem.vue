<template>
  <div>
    <!-- 显示label标签 -->
    <label v-if="label">{{label}}</label>
    <!-- 显示内部表单元素 -->
    <slot></slot>
    <!-- 错误提示信息 -->
    <p v-if="error" class="error">{{error}}</p>
    <p>{{form.model[prop]}}</p>
  </div>
</template>

<script>
export default {
  inject: ['form'],
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
      error: 'some error'
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>

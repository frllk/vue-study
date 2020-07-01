<template>
  <div>
    <h3>parent组件</h3>
    <!-- 爷爷辈的传参在爸爸辈原封不动的转给孙子（数据从爷爷辈过爸爸辈之间转给孙子） -->
    <!-- 转发、祖孙传参 -->
    <!-- 属性展开 -->
    <Child2 v-bind="$attrs" v-on="$listeners"></Child2>
  </div>
</template>

<script>
import Child2 from '@/components/communication/Child2.vue';
export default {
  name: 'Parent',
  components: {
    Child2
  }
};
</script>

<style lang="scss" scoped>

</style>

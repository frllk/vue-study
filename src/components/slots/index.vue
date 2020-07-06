<template>
  <div class="slots">
    <h2>插槽</h2>
    <!-- 插槽 -->
    <Layout>
      <!-- 具名插槽 -->
      <template v-slot:header>开课吧全栈[具名插槽:header]</template>
      <!-- 匿名插槽 -->
      <template>匿名插槽: content...</template>
      <!-- 作用域插槽 -->
      <template v-slot:footer="{fc}">{{fc}}</template>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/slots/Layout.vue'

export default {
  components: {
    Layout
  }
}
</script>

<style scoped>
.slots {
  border: 2px solid #ccc;
  border-radius: 5px;
  margin: 10px 0;
  padding: 10px;
}
</style>

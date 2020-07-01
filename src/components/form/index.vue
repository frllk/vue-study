<template>
  <div>
    <!-- <ElementTest></ElementTest> -->
    <!-- KForm -->
    <!-- model：统一管理，跨组件传值 -->
    <KForm :model="model">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username" placeholder="请输入用户名"></KInput>
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput v-model="model.password" placeholder="请输入密码"></KInput>
      </KFormItem>
    </KForm>
    <!-- <p>{{model}}</p> -->
  </div>
</template>

<script>
// import ElementTest from '@/components/form/ElementTest.vue';
import KInput from '@/components/form/KInput.vue';
import KFormItem from '@/components/form/KFormItem.vue';
import KForm from '@/components/form/KForm.vue';

export default {
  data () {
    return {
      model: {
        username: 'tom',
        password: ''
      }
    }
  },
  components: {
    // ElementTest,
    KInput,
    KFormItem,
    KForm
  }
};
</script>

<style lang="scss" scoped>

</style>

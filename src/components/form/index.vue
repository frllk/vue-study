<template>
  <div>
    <!-- <ElementTest></ElementTest> -->
    <!-- KForm -->
    <!-- model：统一管理，跨组件传值 -->
    <KForm :model="model" :rules="rules" ref="loginForm">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username" placeholder="请输入用户名"></KInput>
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput v-model="model.password" placeholder="请输入密码"></KInput>
      </KFormItem>
      <KFormItem>
        <button @click="login">登录</button>
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
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ]
      }
    }
  },
  components: {
    // ElementTest,
    KInput,
    KFormItem,
    KForm
  },
  methods: {
    login () {
      // 希望表单实例可以提供一个开放的public方法====》在KForm里面需要提供一个全局校验方法
      this.$refs.loginForm.validate(isValid => {
        console.log('校验结果', isValid)
        if (isValid) {
          // 合法
          console.log('quest login');
        } else {
          // 不合法
          alert('校验失败')
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>

</style>

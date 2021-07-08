<template>
  <div>
    <!-- FForm: 考虑表单的应用性，model设置在FForm上，方便统一管理，跨级传参 -->
    <FForm :model="model" :rules="rules" ref="loginForm">
      <FFormItem label="用户名" prop="username">
        <KInput v-model="model.username" placeholder="请输入用户名"></KInput>
      </FFormItem>
      <FFormItem label="密码" prop="password">
        <KInput v-model="model.password" placeholder="请输入密码"></KInput>
      </FFormItem>
      <FFormItem>
        <button @click="Login">登录</button>
      </FFormItem>
    </FForm>
    <!-- <p>{{model}}</p> -->
  </div>
</template>

<script>
import KInput from '@/components/form/FInput.vue'
import FFormItem from '@/components/form/FFormItem.vue'
import FForm from '@/components/form/FForm.vue'
import create from '@/utils/createInstance'
import Notice from '@/components/form/FNotice.vue'

export default {
  // 跨组件通信 provide/inject
  // 统一管理数据，统一分发给别人去用
  provide () {
    return {
      // 返回要给后台的东西
      form: this // 这里传递的是表单组件的实例，是响应式的对象
    }
  },
  data () {
    return {
      model: {
        username: 'tom',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  components: {
    KInput,
    FFormItem,
    FForm
  },
  methods: {
    Login () {
      //   // 希望表单实例可以提供一个开放的public方法====》在KForm里面需要提供一个全局校验方法
      // 希望这个表单可以提供一个全局的开放的validate方法，所以需要在FForm中实现一个全局的校验方法,让我可以直接调用
      // 传一个回调方法，等validate执行完，它调一下，把执行结果返回
      this.$refs.loginForm.validate(isValid => {
        // console.log('校验结果', isValid)
        create(Notice, {
          title: '村长喊你来搬砖',
          message: isValid ? '请求登录' : '请求失败',
          duration: 3000
        }).show()
        // if (isValid) {
        //   // 合法
        //   console.log('request login')
        // } else {
        //   // alert('校验失败')
        // }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

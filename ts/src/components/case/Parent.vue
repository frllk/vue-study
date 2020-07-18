<template>
  <div class="parent">
    <h1>{{ msg }}</h1>
    <p>{{message}}</p>
    <Child msg="some msg from parent!" @updateVal="hUpdateVal" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import CounterModule from '../../store/counter'
import Child from './Child'

// 装饰器写法
@Component({
  components: {
    Child
  }
})
export default class Parent extends Vue {
  // 加括号 => 说明Prop是一个装饰器工厂，返回的才是装饰器，参数一般是配置对象
  // 以Prop为例，就是给Vue传递props选项
  @Prop({ type: String, required: true }) // 写给vue的
  private msg!: string // 这行约束是写给ts编译器的

  // computed：需要定义为访问器属性
  get message() {
    return CounterModule.message
  }

  // methods：直接定义为类的属性即可
  @Emit()
  hUpdateVal(data) {
    console.log(data)
    CounterModule.updateMsg(data)
  }
}
</script>
<style>
.parent {
  border: 2px solid red;
  padding: 20px;
}
</style>

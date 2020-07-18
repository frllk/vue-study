<template>
  <div class="child">
    <h2>{{msg}}</h2>
    <input type="text" :value="message" @change="handleVal($event)">
    <p>{{message}}</p>
  </div>
</template>

<script lang="ts">
/**
 * vuex使用装饰器
 * 要实现的功能：
 * 1.在counter文件中新增属性message，在Parent组件和Child组件中显示
 * 2.当input的change事件触发的时候，执行事件handleVal，抛出事件updateVal给父组件传值
 * 3.父组件监听updateVal事件，调用CounterModule.updateMsg(data)方法修改msg数据
 */
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import CounterModule from '../../store/counter'
@Component
export default class Child extends Vue {
  @Prop({ type: String, required: true }) // 写给vue的
  private msg!: string // 这行约束是写给ts编译器的

  get message() {
    return CounterModule.message
  }
  @Emit()
  handleVal(e) {
    console.log(e.target.value)
    this.$emit('updateVal', e.target.value)
  }
}
</script>
<style>
.child {
  border: 2px solid #058b41;
  padding: 20px;
}
</style>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- 特性列表 -->
    <!-- 新增特性 -->
    <div><input type="text" @keyup.enter="addFeature"></div>
    <ul>
      <li v-for="feature in features" :class="{selected:feature.selected}" :key="feature.id">{{feature.name}}</li>
      <li>total:{{total}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { FeatureSelect } from '../types'

// export default Vue.extend(options)
// class-style
// 猜测：希望得到一个组件构造函数, 解析calss内部所有属性和方法，转换成上面的options
//最后，执行Ctor = Vue.extend(options) 并返回
@Component
export default class HelloWorld extends Vue {
  // 加括号 => 说明Prop是一个装饰器工厂，返回的才是装饰器，参数一般是配置对象
  // 以Prop为例，就是给Vue传递props选项
  @Prop({ type: String, required: true }) // 写给vue的
  private msg!: string // 这行约束是写给ts编译器的

  // 属性将成为data中数据
  features: FeatureSelect[] = []

  // 默认事件名称为方法名，返回值是参数
  @Emit()
  addFeature(e: KeyboardEvent) {
    // ! 非空断言
    // 类型断言
    const inp = e.target as HTMLInputElement
    const feature: FeatureSelect = {
      id: this.features.length + 1,
      name: inp.value,
      selected: false
    }
    this.features.unshift(feature)
    inp.value = ''

    // 告诉老爹添加了一个feature
    // 相当于this.$emit('add-feature', feature)
    return feature
  }

  // 生命周期
  created() {
    // this.features = [
    //   { id: 1, name: '类型注解', selected: false },
    //   { id: 2, name: '编译类型语言', selected: true }
    // ]
  }

  mounted() {
    // 请求数据
    this.$http.get<FeatureSelect[]>('/api/list').then(resp => {
      this.features = resp.data
    })
  }

  // 存储器作为计算属性, 并且是响应式的
  get total() {
    return this.features.length
  }
}

// // option-style
// import Vue from 'vue'
// export default Vue.extend({
//   data() {}
// })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

a {
  color: #42b983;
}
.selected {
  background-color: #7bff00;
  color: #fff;
}
</style>

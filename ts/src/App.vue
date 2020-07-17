<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld @add-feature="addFeature" msg="Welcome to Your Vue.js + TypeScript App" />
    <!-- <TsxComp msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <hr>
    <p @click="add">{{$store.state.counter.count}}</p>
    <p @click="asyncAdd">{{count}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'
import TsxComp from './components/TsxComp'
import { FeatureSelect } from './types'
import CounterModule from './store/counter'

@Component({
  components: {
    HelloWorld,
    TsxComp
  }
})
export default class App extends Vue {
  addFeature(feature: FeatureSelect) {
    console.log('添加了一个新特性', feature.name)
  }

  get count() {
    return CounterModule.count
  }

  add() {
    CounterModule.add()
  }

  asyncAdd() {
    CounterModule.asyncAdd()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

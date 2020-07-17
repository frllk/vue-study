import Vue from 'vue'
import App from './App.vue'
import './ts-test'
import axios from 'axios'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$http = axios
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

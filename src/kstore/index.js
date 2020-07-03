import Vue from 'vue'
import Vuex from './kvuex'
// import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // state应该是响应式的，如何做才能让state变成响应式的呢？？？
  state: {
    counter: 1
  },
  mutations: {
    add (state) {
      // state哪里来的？？？
      state.counter++
    }
  },
  actions: {
    add ({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  getters: {
    doubleCounter: state => {
      return state.counter * 2
    }
  }
})

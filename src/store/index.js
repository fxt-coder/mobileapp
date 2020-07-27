import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: ''
  },
  mutations: {
    // 修改用户信息
    SETUSERINFO (state, newUserInfo) {
      state.userInfo = newUserInfo
    }
  },
  actions: {},
  modules: {}
})

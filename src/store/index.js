import Vue from 'vue'
import Vuex from 'vuex'
import area from '@/utils/area.js'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 判断用户登录
    isLogin: false, // 默认为false 当需要进行登录验证的时候利用Mutations中的方法来改变需要登录页面的isLogin
    userInfo: ''
  },
  mutations: {
    // 修改用户信息
    SETUSERINFO (state, newUserInfo) {
      state.userInfo = newUserInfo
    },
    SETLOGIN (state, newisLogin) {
      state.isLogin = newisLogin
    }
  },
  getters: {
    // 对用户的城市进行转换
    userArea (state) {
      // 如果用户信息存在
      if (state.userInfo) {
        return area.city_list[state.userInfo.area]
      }
      return ''
    },
    // 对Number性别转化
    gender (state) {
      // 对象取值
      const gender = { 0: '未知', 1: '男', 2: '女' }
      return gender[state.userInfo.gender]
    }
  }
})

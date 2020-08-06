import store from '@/store'
import router from '@/router'
import { getToken, removeToken } from '@/utils/token.js'
import { getUserInfo } from '@/api/profile.js'
import { Toast } from 'vant'
export default function (Vue) {
  window.console.log('我被注册了')
  Vue.prototype.$checkLogin = function () {
    // window.console.log('需要登录')
    return new Promise((resolve, reject) => {
      if (store.state.isLogin) {
        resolve()
      } else {
        if (getToken()) {
          getUserInfo()
            .then(res => {
              res.data.avatar = process.env.VUE_APP_URL + res.data.avatar
              store.commit('SETUSERINFO', res.data)
              store.commit('SETLOGIN', true)
              resolve()
            })
            .catch(() => {
              removeToken()
              Toast.fail('请先登录')
              router.push('/login?redirect=' + this.$route.fullPath)
              reject(new Error('请先登录'))
            })
        } else {
          Toast.fail('请先登录')
          router.push('/login?redirect=' + this.$route.fullPath)
          reject(new Error('请先登录'))
        }
      }
    })
  }
}

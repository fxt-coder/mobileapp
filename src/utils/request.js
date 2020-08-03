import axios from 'axios'
import { Toast } from 'vant'
import { getToken } from '@/utils/token.js'

const request = axios.create({
  baseURL: process.env.VUE_APP_URL
})
// 请求拦截
request.interceptors.request.use(
  function (config) {
    // window.console.log('config', config)
    // 判断profile请求中携带的needToken是否为true
    if (config.needToken) {
      // 判断能否获取到token值
      if (getToken()) {
        // 将获取带的token值加入固定格式并放入请求头中
        config.headers.authorization = `Bearer ${getToken()} `
      }
    }
    return config
  },
  function (err) {
    // window.console.log('err', err)
    return Promise.reject(err)
  }
)

// 响应拦截
request.interceptors.response.use(
  function (response) {
    const code = response.data.code
    // 判断返回数据的code
    if (code === 200) {
      // 200 则将数据返回
      return response.data
    } else if (code === 400 || code === 401 || code === 403) {
      // 错误信息则进行弹窗提示  提示信息用data中error  通过message取出信息
      Toast.fail(response.data.message)
      // 这块ESlint语法规范reject后面必须是对象
      return Promise.reject(new Error(response.data.message))
    }
  },
  function (err) {
    return Promise.reject(err)
  }
)
export default request

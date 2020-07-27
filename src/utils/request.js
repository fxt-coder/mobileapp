import axios from 'axios'

const request = axios.create({
  baseURL: process.env.VUE_APP_URL
})
// 响应拦截
request.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (err) {
    return Promise.reject(err)
  }
)
export default request

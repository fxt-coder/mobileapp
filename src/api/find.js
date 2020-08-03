import request from '@/utils/request.js'
// 面经列表
function technicList (params) {
  return request({
    url: '/articles/technic',
    needToken: true,
    params
  })
}
function hotData () {
  return request({
    url: '/chart-data/hot'
  })
}
function shareList (params) {
  return request({
    url: '/articles/share',
    needToken: true,
    params
  })
}

function shareTopSearch () {
  return request({
    url: '/articles/shareTopSearch'
  })
}
export { technicList, hotData, shareList, shareTopSearch }

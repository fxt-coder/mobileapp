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
// 分享详情
function shareInfo (id) {
  return request({
    url: `/articles/share/${id}`
  })
}
// 评论详情
function shareComments (params) {
  const { id, limit, start } = params
  return request({
    url: `/articles/comments/${id}`,
    params: {
      limit,
      start
    }
  })
}
function sendComment (data) {
  return request({
    url: '/articles/comments',
    method: 'post',
    needToken: true,
    data
  })
}
function starArticles (data) {
  return request({
    url: '/articles/star',
    method: 'post',
    needToken: true,
    data
  })
}
export {
  starArticles,
  sendComment,
  shareComments,
  shareInfo,
  technicList,
  hotData,
  shareList,
  shareTopSearch
}

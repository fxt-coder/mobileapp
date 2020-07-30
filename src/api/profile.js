import request from '@/utils/request'

function getUserInfo () {
  return request({
    url: 'au/info',
    method: 'get',
    // 接口需要token
    needToken: true
  })
}
function editUserInfo (data) {
  return request({
    url: 'au/edit',
    method: 'post',
    data,
    needToken: true
  })
}
function uploadFiles (data) {
  return request({
    url: '/upload',
    method: 'post',
    data,
    needToken: true
  })
}
export { getUserInfo, editUserInfo, uploadFiles }

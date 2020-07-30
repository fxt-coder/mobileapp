import request from '@/utils/request'

function getUserInfo () {
  return request({
    url: 'au/info',
    method: 'get',
    needToken: true
  })
}
export { getUserInfo }

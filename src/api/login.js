import request from '@/utils/request.js'

// eslint-disable-next-line space-before-function-paren
function getCode (data) {
  return request({
    url: '/au/code',
    method: 'post',
    data
  })
}

function login (data) {
  return request({
    url: '/au/login',
    method: 'post',
    data
  })
}
export { getCode, login }

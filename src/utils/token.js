// 将token设成常量便于以后修改
const TOKENKEY = 'TOKEN'
function saveToken (token) {
  window.localStorage.setItem(TOKENKEY, token)
}
function getToken () {
  return window.localStorage.getItem(TOKENKEY)
}
function removeToken () {
  window.localStorage.removeItem(TOKENKEY)
}
export { saveToken, getToken, removeToken }

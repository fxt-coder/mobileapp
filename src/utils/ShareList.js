const SHAREHISTORYKEY = 'SHAREHISTORYKEY'
// 保存数据
function saveHistory (history) {
  localStorage.setItem(SHAREHISTORYKEY, JSON.stringify(history))
}
// 读取数据
function getHistory () {
  const historyStr = localStorage.getItem(SHAREHISTORYKEY)
  const history = JSON.parse(historyStr)
  if (history) {
    return history
  } else {
    return []
  }
}
// 删除数据
function removeHistory () {
  localStorage.removeItem(SHAREHISTORYKEY)
}
export { saveHistory, getHistory, removeHistory }

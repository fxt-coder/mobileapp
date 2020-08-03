import moment from 'moment'
// Vue.filter('formateTime', value => {
//   moment.locale('zh-cn')
//   value = value.slice(0, value.length - 2)
//   // 时间差(现在的时间跟传入的value值相比较)
//   const delayTime = moment().diff(moment(value), 'days')
//   if (delayTime > 1) {
//     return moment(value).format('YYYY年MM月DD日')
//   } else {
//     return moment(value).fromNow()
//   }
// })
const formateTime = function (value) {
  moment.locale('zh-cn')
  value = value.slice(0, value.length - 2)
  // 时间差(现在的时间跟传入的value值相比较)
  const delayTime = moment().diff(moment(value), 'days')
  if (delayTime > 1) {
    return moment(value).format('YYYY年MM月DD日')
  } else {
    return moment(value).fromNow()
  }
}

export { formateTime }

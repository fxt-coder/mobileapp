import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import moment from 'moment'
import 'normalize.css'
// 整合vant
// eslint-disable-next-line import/no-duplicates
import Vant from 'vant'
// import { Vant, Toast } from 'vant'
import 'vant/lib/index.css'
// 导入flexible 动态设置rem大小
import 'amfe-flexible'
// 字体图标引入
import '@/styles/iconfont.css'
// 基础css引入
import '@/styles/base.less'
// import NavBar from '@/components/NavBar.vue'
// import cell from '@/components/cell.vue'
// 导入组件库components
import Components from '@/components/index.js'
// eslint-disable-next-line import/no-duplicates
import { Toast } from 'vant'
// 导入全局过滤器
import * as filters from '@/filters/index.js'
Toast.setDefaultOptions({ duration: 1000 })
// 注册filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 注册vant
Vue.use(Vant)
// 注册Components组件库
Vue.use(Components)
// Vue.component(NavBar.name, NavBar)
// Vue.component(cell.name, cell)
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
Vue.config.productionTip = false

// asdasd
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

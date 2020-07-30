import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
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
import Components from './components'
// eslint-disable-next-line import/no-duplicates
import { Toast } from 'vant'
Toast.setDefaultOptions({ duration: 1000 })
// 注册vant
Vue.use(Vant)
// 注册Components组件库
Vue.use(Components)
// Vue.component(NavBar.name, NavBar)
// Vue.component(cell.name, cell)
Vue.config.productionTip = false
// asdasd
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

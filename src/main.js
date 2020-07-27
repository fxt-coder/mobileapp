import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
// 整合vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 导入flexible 动态设置rem大小
import 'amfe-flexible'
// 字体图标引入
import '@/styles/iconfont.css'
// 基础css引入
import '@/styles/base.less'
import NavBar from '@/components/NavBar.vue'
// 注册vant
Vue.use(Vant)
Vue.component(NavBar.name, NavBar)
Vue.config.productionTip = false
// asdasd
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

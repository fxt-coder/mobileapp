import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
// 整合vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 注册vant
Vue.use(Vant)
Vue.config.productionTip = false
// asdasd
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'
import company from '@/views/company/index.vue'
import find from '@/views/find/index.vue'
import my from '@/views/my/index.vue'
import question from '@/views/question/index.vue'
import login from '@/views/login/index.vue'
import profile from '@/views/my/profile.vue'
import editInfo from '@/views/my/editInfo/index.vue'
import marketData from '@/views/find/marketData/index.vue'
import share from '@/views/find/share/index.vue'
import shareList from '@/views/find/share/shareList.vue'
import technicList from '@/views/find/technic/technicList.vue'
import marketDataList from '@/views/find/marketData/marketDataList.vue'
import technic from '@/views/find/technic/index.vue'
import search from '@/views/find/search/index.vue'
import { Toast } from 'vant'
import store from '@/store/index.js'
import { getToken, removeToken } from '@/utils/token.js'
import { getUserInfo } from '@/api/profile.js'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // { path: '/', redirect: '/login' },
    { path: '/', redirect: '/login' },
    {
      path: '/company',
      component: company,
      meta: {
        showTabbar: true
      }
    },
    {
      path: '/find',
      component: find,
      meta: {
        showTabbar: true
      }
    },
    {
      path: '/my',
      component: my,
      meta: {
        showTabbar: true,
        needLogin: true
      }
    },
    {
      path: '/question',
      component: question,
      meta: {
        showTabbar: true
      }
    },
    {
      path: '/marketData',
      component: marketData
    },
    {
      path: '/share',
      component: share
    },
    {
      path: '/technic',
      component: technic
    },
    {
      path: '/shareList',
      component: shareList
    },
    {
      path: '/technicList',
      component: technicList
    },
    {
      path: '/marketDataList',
      component: marketDataList
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/profile',
      component: profile,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/editInfo',
      component: editInfo,
      meta: {
        needLogin: true
      }
    }
  ]
})
// 导航守卫
// 路由跳转之前do something
router.beforeEach((to, from, next) => {
  // window.console.log('to', to)
  // window.console.log('from', from)
  // 判断去往的页面是否需要登录
  if (to.meta.needLogin) {
    // 首先判断路由元信息中的needLogin
    // 判断vuex中的登录状态
    if (store.state.isLogin) {
      // 判断仓库中的isLogin是否因为跳转需要登录的页面发生isLogin状态改变，如果此时状态为true则表示进入的页面已经做了登录处理
      next()
    } else {
      // 没有登录处理的页面进行如下操作
      // 判断页面是否有token
      if (getToken()) {
        // 有token 则可以通过token获取到信息
        getUserInfo()
          .then(res => {
            // window.console.log(res)
            res.data.avatar = process.env.VUE_APP_URL + res.data.avatar
            store.commit('SETUSERINFO', res.data)
            store.commit('SETLOGIN', true)
            next()
          })
          // 如果没有token或者token错误则需要removeToken并且重新登录
          .catch(err => {
            window.console.log(err)
            removeToken()
            Toast.fail('请先登录')
            // next('/login')
            // 重新登录的页面是之前需要登录的页面
            next(`/login?redirect=${to.fullPath}`)
          })
      } else {
        Toast.fail('请先登录')
        // next('/login')
        next(`/login?redirect=${to.fullPath}`)
      }
    }
  } else {
    next()
  }
})
export default router

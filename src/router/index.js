import Vue from 'vue'
import VueRouter from 'vue-router'
import company from '@/views/company/index.vue'
import find from '@/views/find/index.vue'
import my from '@/views/my/index.vue'
import question from '@/views/question/index.vue'
import login from '@/views/login/index.vue'
import profile from '@/views/my/profile.vue'
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
        showTabbar: true
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
      path: '/login',
      component: login
    },
    {
      path: '/profile',
      component: profile
    }
  ]
})

export default router

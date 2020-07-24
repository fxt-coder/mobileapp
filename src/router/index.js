import Vue from 'vue'
import VueRouter from 'vue-router'
import Company from '@/views/Company/index.vue'
import Find from '@/views/Find/index.vue'
import My from '@/views/My/index.vue'
import Question from '@/views/Question/index.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/Company',
      component: Company

    },
    {
      path: '/Find',
      component: Find
    },
    {
      path: '/My',
      component: My
    },
    {
      path: '/Question',
      component: Question
    }
  ]
})

export default router

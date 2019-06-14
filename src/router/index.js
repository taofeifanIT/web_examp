import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import All from '@/components/All'
import Active from '@/components/Active'
import completed from '@/components/completed'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'All',
      component: All
    },
    {
      path: '/Active',
      name: 'Active',
      component: Active
    },
    {
      path: '/completed',
      name: 'completed',
      component: completed
    }
  ]
})

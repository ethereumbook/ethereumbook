import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auction from '@/components/Auction'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/auctions/:id',
      name: 'Auction',
      component: Auction
    }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

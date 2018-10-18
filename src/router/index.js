import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home.vue' //@表示src这一个根路径
import Membre from '@/components/membre.vue'
import Search from '@/components/search.vue'
import Shopping from '@/components/shoppingCar.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/home',component: Home},
    {path: '/membre',component: Membre},
    {path: '/search',component: Search},
    {path: '/shopping',component: Shopping},
    {path:'/*', redirect:'/home'}
  ],
  linkActiveClass: 'mui-active'
})

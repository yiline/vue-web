import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home.vue' //@表示src这一个根路径
import Membre from '@/components/membre.vue'
import Search from '@/components/search.vue'
import Shopping from '@/components/shoppingCar.vue'
import newsList from '@/components/news/newsList.vue'
import newsInfo from '@/components/news/newsInfo.vue'
import photoList from '@/components/news/photoList.vue'
import photoInfo from '@/components/news/photoInfo.vue'
import goodsList from '@/components/news/goodsList.vue'
import goodsInfo from '@/components/news/goodsInfo.vue'
import goodsIntroduce from '@/components/news/goodsIntroduce.vue'
import goodsComment from '@/components/news/goodsComment.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/home',component: Home},
    {path: '/membre',component: Membre},
    {path: '/search',component: Search},
    {path: '/shopping',component: Shopping},
    {path:'/home/newsList', component:newsList},
    {path:'/home/newsInfo/:id', component:newsInfo},
    {path:'/home/photoList', component:photoList},
    {path:'/home/photoInfo/:id',component:photoInfo},
    {path:'/home/goodsList', component:goodsList},
    {path:'/home/goodsInfo/:id',component:goodsInfo},
    {path:'/home/goodsIntroduce/:id',name:'goodsIntroduce',component:goodsIntroduce},
    {path:'/home/goodsComment/:id',name:'goodsComment',component:goodsComment},
    {path:'/*', redirect:'/home'},
  ],
  linkActiveClass: 'mui-active'
})

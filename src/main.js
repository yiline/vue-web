// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'

// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)

// import './assets/mui/css/mui.min.css'

// Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

import Vue from 'vue'
import router from './router'  //默认请求router下面的index.js
import App from './App.vue'
//引入路由模块
import VueResource from 'vue-resource'
Vue.use(VueResource)
//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car') || '[]')
const store = new Vuex.Store({
  state:{
    car:car
  },
  mutations:{
    addGoods(state,goodsDetail){
      var flag = false
      state.car.some(item=>{
        if(item.id === goodsDetail.id){
          item.count += parseInt(goodsDetail.count)
          flag = true
          return true
        }
      })
      if(!flag){
        state.car.push(goodsDetail)
      }
      localStorage.setItem('car',JSON.stringify(state.car))
      //console.log(state.car)
    },
    removeFromCar(state,id){
      state.car.some((item,i)=>{
        if(item.id ==id){
          state.car.splice(i,1)
          return true
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateSelected(state,info){
      state.car.forEach(item=>{
        if(item.id == info.id){
          item.selected = info.selected
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  getters:{
    getAllCount(state){
      var allCount = 0
      state.car.forEach(item=>{
        allCount += item.count
      })
      return allCount
    },
    getCarCount(state){
      var o = {}
      state.car.forEach(item=>{
        o[item.id]= item.count
      })
      localStorage.setItem('car',JSON.stringify(state.car))
      return o
    },
    getCarSelected(state){
      var select = {}
      state.car.forEach(item=>{
        select[item.id] = item.selected
      })
      return select
    },
    countAllGoods(state){
      var o = {count:0,amount:0}
      state.car.forEach(item=>{
        if(item.selected){
          o.count += item.count
          o.amount += item.count*item.price
        }
      })
      return o
    }
  }
})


//设置根路径
Vue.http.options.root = 'http://027xin.com:8899'

//时间格式化(过滤器)
import moment from 'moment'
Vue.filter('dataFormat',(datatime,pattern='YYYY-MM-DD HH:mm:ss')=>{
    return moment(datatime).format(pattern)
})
//post提交第三个参数
Vue.http.options.emulateJSON = true

//头部
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//底部样式mui
import './assets/mui/css/mui.min.css'
import './assets/mui/css/icons-extra.css'
import mui from'./assets/mui/js/mui.min.js'

//
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

new Vue({
  el:'#app',
  router,
  store,
  render: c => c(App)
})

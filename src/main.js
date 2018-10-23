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


new Vue({
  el:'#app',
  router,
  render: c => c(App)
})

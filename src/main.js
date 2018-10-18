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


//头部
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//底部样式mui
import './assets/mui/css/mui.min.css'
import './assets/mui/css/icons-extra.css'



new Vue({
  el:'#app',
  router,
  render: c => c(App)
})

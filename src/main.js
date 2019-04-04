// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//引入axios

import axios from "axios"



Vue.prototype.axios = axios


import {routes} from "./router/router.js"
//引入路由
import VueRouter from "vue-router"



Vue.config.productionTip = false

Vue.use(VueRouter)


const router = new VueRouter({
	mode:"history",
	routes:routes,
	//路由激活状态下，添加的类
	linkActiveClass:"active"
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

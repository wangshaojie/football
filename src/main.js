// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import "bulma/css/bulma.min.css";  //验证de样式
import router from './router'
import { AlertPlugin, ToastPlugin } from 'vux'
import '../static/js/validate.js'
import axios from 'axios'
import axiosPlugin from './server';  //axios权限
import mock from './mock/mockjs.js'
import _ from 'underscore'


Vue.config.productionTip = false
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(axiosPlugin);
Vue.prototype.axios = axios;
Vue.prototype._ = _;





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})




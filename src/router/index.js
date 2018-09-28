import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import Login from '@/views/regsiter/Login'
import Home from '@/views/Home'
import Plan from '@/views/Plan'
import Tree from '@/views/tree'

import axiosPlugin from "../server";
Vue.use(axiosPlugin);

Vue.use(Router, axios)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        requireAuth : true
      },
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/plan',
      name: 'plan',
      component: Plan
    },
    {
      path: '/tree',
      name: 'tree',
      component: Tree
    }
  ]
});


/*
  登陆权限
*/
// router.beforeEach((to, from, next) => {
//   //判断是否需要登陆权限
//   if(to.matched.some(res => res.meta.requireAuth)) {
//     //window.localStorage.setItem("loginUserBaseInfo", "wangsj00")
//     //localStorage.removeItem("loginUserBaseInfo");
//     if(!localStorage.token){
//       next({
//         path: '/login',
//         query : {redirect : to.fullpath} //将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }else{
//       next()
//     }
//   }else{
//     next()
//   }
// });

export default router;
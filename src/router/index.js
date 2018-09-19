import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import Login from '@/views/regsiter/Login'
import Home from '@/views/Home'

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
    }
  ]
});


/*
  登陆权限
*/
router.beforeEach((to, from, next) => {
  //判断是否需要登陆权限
  if(to.matched.some(res => res.meta.requireAuth)) {
    //window.localStorage.setItem("loginUserBaseInfo", "wangsj00")
    //localStorage.removeItem("loginUserBaseInfo");
    if(localStorage.getItem("loginUserBaseInfo")){
      //这里需要做token过期处理
      let lifeTime =
        JSON.parse(window.localStorage.getItem("loginUserBaseInfo")).lifeTime *
        1000;
        let nowTime = (new Date()).getTime(); // 当前时间的时间戳
        if (nowTime < lifeTime) {
          next();
        }else{
          this.$nextTick(function(){
            this.$vux.toast.show({
              text: err
            })
          })
          next({
            path: "/login"
          })
        }
    }else{
      next({
        path: '/login',
        query : {redirect : to.fullpath} //将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }else{
    next()
  }
});

export default router;
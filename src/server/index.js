import axios from "axios";
import router from "../router";
/*
  Axios设置
*/
const Axios = axios.create({
    baseURL: "/", //反向代理
    timeout: 10000,
    responseType: "json",
    withCredentials: true, // 是否允许带cookie这些
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
})

//axios http request 拦截器
axios.interceptors.request.use(
  config => {
    if(window.localStorage.token){
      config.headers.Authorization = `token ${window.localStorage.getItem("token")}`;
    }else{
      router.push({
        path: "/login"
      });
    }
    return config;
  },
  error => {
    this.$nextTick(function(){
      this.$vux.toast.show({
        text: error
      })
    })
    return Promise.reject(error)
  }
);

//axios http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
      // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
      // 直接丢localStorage或者sessionStorage
      if (!window.localStorage.getItem("loginUserBaseInfo")) {
        // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
        router.push({
          path: "/login"
        });
      }else{
        // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
        // 乖乖的返回去登录页重新登录
        let lifeTime =
          JSON.parse(window.localStorage.getItem("loginUserBaseInfo")).lifeTime *
          1000;
        let nowTime = new Date().getTime(); // 当前时间的时间戳
        console.log(nowTime, lifeTime);
        console.log(nowTime > lifeTime);
        if (nowTime > lifeTime) {
          this.$nextTick(function(){
            this.$vux.toast.show({
              text: "登录状态信息过期,请重新登录"
            })
          })
          router.push({
            path: "/login"
          });
        }else{
          // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
          if (error.response.status === 403) {
            router.push({
              path: "/error/403"
            });
          }
        }
      }
      // 返回 response 里的错误信息
      let errorInfo =  error.data.error ? error.data.error.message : error.data;
      return Promise.reject(errorInfo);
  }
)

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function(Vue, Option) {
    Object.defineProperty(Vue.prototype, "$http", { value: Axios });
  }
};
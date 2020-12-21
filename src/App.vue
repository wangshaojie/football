<template>
  <div id="app">
  	<x-header 
    v-show="isHeader"
    v-if="$route.path!='/login'"
    :left-options="{showBack: $route.path!='/' ? true : false}"
    >{{title}}</x-header>
    <router-view/>


  </div>
</template>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import "assets/styles/global.less";
</style>

<script>
	import {XHeader} from  'vux';
	export default {
	  name: 'App',
	  components:{
	  	XHeader
	  },
    data(){
      return{
        title : this.$route.name,
        isHeader : false
      }
    },
    mounted(){
      if(this.$route.path == '/'){
        this.isHeader = false
      }
    }
	}
</script>


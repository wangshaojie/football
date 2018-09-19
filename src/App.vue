<template>
  <div id="app">
  	<x-header>This is the page title.</x-header>
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
	  }
	}
</script>

<style>
.underlineHover{
    color:@color;
  }
</style>

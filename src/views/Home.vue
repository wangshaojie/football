<template>
	<div>
		<swiper :list="demo01_list" v-model="demo01_index" 
		auto loop
		@on-index-change="demo01_onIndexChange">
		</swiper>
		<router-view></router-view>
		<div>
			<router-view class="view" v-on:changeTab="changeTab"></router-view>
			<tabbar v-model="index">
			      <tabbar-item>
			        <img slot="icon" class="iconfont icon-shouye">
			        <span slot="label">首页</span>
			      </tabbar-item>
			      <tabbar-item show-dot link="/plan">
			        <img slot="icon" src="http://temp.im/879x200">
			        <span slot="label">票房排名</span>
			      </tabbar-item>
			      <tabbar-item selected link="/component/demo">
			        <img slot="icon" src="http://temp.im/879x200">
			        <span slot="label">Explore</span>
			      </tabbar-item>
			      <tabbar-item badge="2">
			        <img slot="icon" src="http://temp.im/879x200">
			        <span slot="label">News</span>
			      </tabbar-item>
		  	</tabbar>
		</div>
	</div>
</template>

<style type="text/css" lang="less">
	.vux-swiper-desc{
		height: auto!important;
	}
</style>

<script>
	import { Swiper, Tabbar, TabbarItem } from 'vux'
	export default{
		components: {
	    	Swiper,
	    	Tabbar,
      		TabbarItem
	  	},
	  	data(){
	  		return {
	  			demo01_list:[],
	  			demo01_index: 0,
	  			index:null
	  		}
	  	},
	  	methods:{
	  		demo01_onIndexChange (index) {
		      this.demo01_index = index
		    },
		    getIndexSwiper(){
		    	var _this = this;
		    	console.log(this._.first([5, 4, 3, 2, 1]))
		    	this.axios.get('/api/index/imglist')
		    	.then(function(res){
		    		if(res.status == 200){
		    			var dataArr = res.data.imglist;
		    			var data = [];
		    			for(var i =0; i <dataArr.length;i++){
		    				var obj = {}
		    				obj.url = dataArr[i].url;
		    				obj.img = dataArr[i].img;
		    				obj.title = dataArr[i].title;
		    				data.push(obj)
		    			}
		    			_this.demo01_list = data;
		    		}
		    	})
		    },
		    changeTab(num){
		       this.index = num;
		    }
	  	},
	  	mounted(){
	  		this.getIndexSwiper();
	  	}
	}
</script>

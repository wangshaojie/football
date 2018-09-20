<template>
	<div>
		<swiper :list="demo01_list" v-model="demo01_index" 
		auto loop
		@on-index-change="demo01_onIndexChange"></swiper>
	</div>
</template>

<script>
	import { Swiper } from 'vux'
	export default{
		components: {
	    	Swiper
	  	},
	  	data(){
	  		return {
	  			demo01_list:[],
	  			demo01_index: 0
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
		    }
	  	},
	  	mounted(){
	  		this.getIndexSwiper();
	  	}
	}
</script>

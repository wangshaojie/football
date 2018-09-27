<template>
	<div>
	    <div>
	      <sticky
	        ref="sticky"
	        :offset="46"
	        :check-sticky-support="false"
	        :disabled="disabled"> 
	       <div>
		       <tab :line-width=2 active-color='#fc378c' v-model="index">
		        <tab-item class="vux-center"  v-for="(item, index) in menu" :key="index">{{item}}</tab-item>
		      </tab>
		      <swiper v-model="index" height="100px" :show-dots="false">
		        <swiper-item v-for="(item, index) in menu" :key="index">
		          <div class="tab-swiper vux-center" v-show="item == '正在正映'">
		          	<flexbox>
					    <flexbox-item>
							<group>
						      <selector v-model="value2" :options="search" @on-change="searchHandler"></selector>
						    </group>
					    </flexbox-item>
				    </flexbox>
		          </div>
		        </swiper-item>
		      </swiper>
	       </div>
	      </sticky>
	    </div>
	   
	    
	</div>
</template>

<style type="text/css" lang="less">
	.weui-cells{
		margin-top: 0!important;
		height: 30px;
		line-height: 30px;
		select{
			height: 30px;
			line-height: 30px;
			font-size: 12px;
		}
	}
</style>

<script>
	import { Selector, Group, Tab, TabItem, Sticky, Flexbox, FlexboxItem, Swiper, SwiperItem  } from 'vux'
	const list = () => ['正在正映', '即将上映']
	export default {
	  components: {
	    Selector,
	    Group,
	    Tab,
	    TabItem,
	    Sticky,
	    Flexbox,
    	FlexboxItem,
    	Swiper,
    	SwiperItem
	  },
	  data(){
	  	return {
	  		value2: 1,
	  		value3: 1,
	  		index: 0,
	  		menu: list(),
	  		search: [],
	  		movieList : [],
	  		list3: [{key: 1, value: '是'}, {key: 2, value: '否'}],
	  		disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent)
	  	}
	  },
	  mounted(){
	  	this.moviescreening();
	  	this.getMovieList();
	  },
	  methods:{
	  	spaceChange () {
	      this.showSpace = !this.showSpace
	      this.$nextTick(() => {
	        this.$refs.sticky.bindSticky()
	      })
	    },
	    onItemClick (index) {
	      console.log('on item click:', index)
	    },
	    moviescreening () {
	    	var _this = this;
	    	this.axios.get('/api/movie/moviescreening')
	    	.then(function(res){
	    		if(res.status == 200){
	    			_this.search = res.data.moviescreening;
	    		}
	    	})
	    	.catch(function (error) {
			   console.log(error);
		  	});
	    },
	    getMovieList () {
	    	console.log(this)
	    	this.axios.get('https://api.shenjian.io/promovie/piaofang?appid=628bb7321fd44ab599dc15ed373c644e',{withCredentials:true})
	    	.then(function(res){
	    		console.log(res)
	    	})
	    	.catch(function(error){

	    	})
	    },
	    searchHandler () {
	    	console.log(this.value2)
	    }
	  }
	}

</script>
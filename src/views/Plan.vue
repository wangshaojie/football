<template>
	<div>
	    <div>
	      <sticky
	        ref="sticky"
	        :offset="46"
	        :check-sticky-support="false"
	        :disabled="disabled"> 
	       <div class="row">
		       <flexbox>
				    <flexbox-item>
				    	<div class="flex-demo" v-on:click="dateRange">
				    		9.28-9.29
							<x-icon type="ios-arrow-down" size="15"></x-icon>
				    	</div>
				    </flexbox-item>
				    <flexbox-item>
						<div class="flex-demo">
							筛选
							<x-icon type="ios-arrow-down" size="15"></x-icon>
						</div>
				    </flexbox-item>
				    <flexbox-item>
						<div class="flex-demo">
							位置
							<x-icon type="ios-arrow-down" size="15"></x-icon>
						</div>
				    </flexbox-item>
				    <flexbox-item>
						<div class="flex-demo">
							推荐排序
							<x-icon type="ios-arrow-down" size="15"></x-icon>
						</div>
				    </flexbox-item>
			    </flexbox>
	       </div>
	      </sticky>
	      <div v-transfer-dom>
		      <popup v-model="show1" height="100%">
		        <div class="popup1">
			        <transition  name="slide">
						<DatePicker @select="calendar.select" :start="calendar.start"  :last="calendar.last" :beginDate="calendar.begin" :endDate="calendar.end" :monthLength="calendar.monthLength"  v-show="calendar.show" ></DatePicker>
					</transition>
		        </div>
		      </popup>
		    </div>
	    </div>
	    
	   
	    
	</div>
</template>

<style type="text/css" lang="less">
	.flex-demo {
	  text-align: center;
	  font-size: 14px;
	  svg{
	  	vertical-align: middle;
	  }
	}
	.row{
		padding: 0 10px;
	}
	.popup1 {
	  width:100%;
	  height:100%;
	}
	.position-vertical-demo {
	  background-color: #ffe26d;
	  color: #000;
	  text-align: center;
	  padding: 15px;
	}
	.position-horizontal-demo {
	  position: relative;
	  height: 100%;
	  .vux-close {
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translateX(-50%) translateY(-50%) scale(4);
	    color: #000;
	  }
	}
</style>

<script>
	import DatePicker from "../components/datePiker.vue"
	import { Selector, Group, Sticky, Flexbox, FlexboxItem, Swiper, SwiperItem, Datetime, Popup, XSwitch, TransferDom} from 'vux'
	export default {
	  components: {
	    Selector,
	    Group,
	    Sticky,
	    Flexbox,
    	FlexboxItem,
    	Swiper,
    	SwiperItem,
    	Datetime,
    	Popup,
    	XSwitch,
    	DatePicker
	  },
	  directives: {
	    TransferDom
	  },
	  data(){
	  	return {
	  		value2: 1,
	  		value3: 1,
	  		index: 0,
	  		search: [],
	  		movieList : [],
	  		show1: false,
	  		date: '2018-08-18',
	  		disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent),
	  		calendar:{
				monthLength:6,
				show:false,
				start:{year:new Date().getFullYear(),month:new Date().getMonth()+1,day:new Date().getDate()},
				// last:{year:'2018',month:'08',day:'01'},
				begin:{year:'2018',month:'07',day:'02'},
				end:{year:'2018',month:'07',day:'03'},
				select:(begin,end)=>{
					if(end.day){
						this.calendar.show = false;
						this.show1 = false;
						console.log(this.show1)
					}
					this.calendar.begin=begin;
					this.calendar.end=end;
				}
		    },
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
	    dateRange () {
	    	this.show1 = true;
	    	this.calendar.show = true;
	    },
	    log (str1, str2 = '') {
	      console.log(str1, str2)
	    },
	    change (value) {
	      console.log('change', value)
	    },
	    onConfirm (val) {
	      console.log('on-confirm arg', val)
	      console.log('current value', this.value1)
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
	    	this.axios.get('',{withCredentials:true})
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
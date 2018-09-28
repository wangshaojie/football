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
				    <flexbox-item :span="4">
				    	<div class="flex-demo" v-on:click="dateRange">
				    		{{calendar.begin.month}}.{{calendar.begin.day}}-{{calendar.end.month}}.{{calendar.end.day}}
							<x-icon type="ios-arrow-down" size="12"></x-icon>
				    	</div>
				    </flexbox-item>
				    <flexbox-item>
						<div class="flex-demo" v-on:click="screenFull">
							筛选
							<x-icon type="ios-arrow-down" size="12"></x-icon>
						</div>
				    </flexbox-item>
				    <flexbox-item>
						<div class="flex-demo">
							位置
							<x-icon type="ios-arrow-down" size="12"></x-icon>
						</div>
				    </flexbox-item>
				    <flexbox-item :span="4">
						<div class="flex-demo">
							推荐排序
							<x-icon type="ios-arrow-down" size="12"></x-icon>
						</div>
				    </flexbox-item>
			    </flexbox>
	       </div>
	      </sticky>

	      <!-- 
			时间控件
	       -->
	      	<div v-transfer-dom>
		      <popup v-model="dateIsShow" height="100%">
		        <div class="popup1">
			        <transition  name="slide">
						<DatePicker @select="calendar.select" :start="calendar.start"  :last="calendar.last" :beginDate="calendar.begin" :endDate="calendar.end" :monthLength="calendar.monthLength"  v-show="calendar.show" ></DatePicker>
					</transition>
		        </div>
		      </popup>
		    </div>

		    <!-- 筛选 -->
		    <div v-transfer-dom>
		      <popup v-model="screenIsShow" height="100%">
		        <div class="popup1">
			        <br>
				    <divider> {{ ('居室') }} </divider>
				    <flexbox>
				      <flexbox-item v-for="item in jushi" :key="item.id">
				      	<div class="flex-demo flex-screen" @click="onClick(item.id)" :class="{cur:jushiId==item.id}">{{item.text}}</div>
				      </flexbox-item>
				    </flexbox>
		        </div>
		      </popup>
		    </div>
	    

	    </div> 
	</div>
</template>

<style type="text/css" lang="less">
	.flex-demo {
	  text-align: center;
	  font-size: 12px;
	  font-weight: bold;
	  svg{
	  	vertical-align: middle;
	  }
	}
	.row{
		padding: 0 10px;
	}
	.v-transfer-dom .vux-popup-dialog{
		background: #fff;
	}
	.popup1 {
	  width:100%;
	  height:100%;
	  padding: 0 10px;
	  .vux-flexbox-item{
		background: #F8F8F8;
	  }
	  .flex-screen{
	  	padding: 10px 0;
	  }
	  .cur{
	  	background: #17BD88;
	  	color: #fff;
	  }
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
	import { Selector, Group, Sticky, Flexbox, FlexboxItem, Divider, Swiper, SwiperItem, Datetime, Popup, XSwitch, TransferDom} from 'vux'
	export default {
	  components: {
	    Selector,
	    Group,
	    Sticky,
	    Flexbox,
    	FlexboxItem,
    	Divider,
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
	  		dateIsShow: false,  //时间控件显示隐藏
	  		screenIsShow : false, //筛选控件
	  		date: '2018-08-18',
	  		disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent),
	  		calendar:{
				monthLength:6,
				show:false,
				start:{year:new Date().getFullYear(),month:new Date().getMonth()+1,day:new Date().getDate()},
				// last:{year:'2018',month:'08',day:'01'},
				begin:{year:new Date().getFullYear(),month:new Date().getMonth()+1,day:new Date().getDate()},
				end:{year:new Date().getFullYear(),month:new Date().getMonth()+1,day:new Date().getDate()+1},
				select:(begin,end)=>{
					if(end && end.day){
						this.calendar.show = false;
						this.dateIsShow = false;
					}
					this.calendar.begin=begin;
					this.calendar.end=end;
				}
		    },
		    jushi:[{id:1,text:"1居室"},{id:2,text:"2居室"},{id:3,text:"3居室"},{id:4,text:"4居室"}],
		    jushiId:null
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
	    	this.dateIsShow = true;
	    	this.calendar.show = true;
	    },
	    screenFull () {
	    	this.screenIsShow = true
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
	    onClick (id) {
	    	console.log(id)
	    	this.jushiId=id
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
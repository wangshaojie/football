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
				    <flexbox-item :span="3">
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
				    <flexbox-item :span="2">
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
			        <div class="wrap">
			        	<div class="text-center text-bold header">
			        		<span>筛选</span>
			        		<x-icon type="ios-close-empty" size="40" class="close" @click="onClosePop"></x-icon>
			        	</div>
			        	<div class="row" style="margin-top: 16px;">
				        	<br>
						    <divider> {{ ('居室') }} </divider>
						    <flexbox wrap="wrap">
						      <flexbox-item :span="2.7" v-for="item in jushi" :key="item.id">
						      	<div class="flex-demo flex-screen" @click="onClickJushi(item.id)" :class="{cur:jushiId==item.id}">{{item.text}}</div>
						      </flexbox-item>
						    </flexbox>
				        </div>
					    <div class="row row-price">
					    	<br>
						    <divider> {{ ('每晚价格') }} {{priceValue.value}} </divider>
						    <vue-slider v-model="priceValue.value" v-bind="priceValue.options"></vue-slider>
					    </div>
					    <div class="row number-style">
						    <group>
						      <x-number :title="('人数')" v-model="pepleNum" button-style="round" :min="0" :max="5"></x-number>
						    </group>
					    </div>
					    <div class="row number-style bed">
						    <group>
						      <x-number :title="('床数')" v-model="bedNum" button-style="round" :min="0" :max="5"></x-number>
						    </group>
					    </div>
					    <div class="row">
				        	<br>
						    <divider> {{ ('房型') }} </divider>
						    <flexbox wrap="wrap">
						      <flexbox-item :span="2.7" v-for="item in houseTypeDate" :key="item.id">
						      	<div class="flex-demo flex-screen" @click="onClickHouseType(item.id)" :class="{cur:houseTypeIds.indexOf(item.id) > -1}">{{item.text}}</div>
						      </flexbox-item>
						    </flexbox>
				        </div>

				        <div class="row device-style">
				        	<br>
						    <divider> {{ ('设施') }} </divider>
						    <flexbox wrap="wrap">
						      <flexbox-item :span="2.7" v-for="item in deviceData" :key="item.id">
						      	<div class="flex-demo flex-screen" @click="onClickDevice(item.id)" :class="{cur:deviceIds.indexOf(item.id) > -1}"><i :class="item.icon"></i>{{item.text}}</div>
						      </flexbox-item>
						    </flexbox>
				        </div>
			        </div>

			        <flexbox :gutter="0" class="btn-group">
				      <flexbox-item :span="4"><x-button>重置</x-button></flexbox-item>
				      <flexbox-item><x-button type="primary">确定</x-button></flexbox-item>
				    </flexbox>

		        </div>
		      </popup>
		    </div>
			
			<div class="container">
				<!--mescroll滚动区域的基本结构-->
			    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
			      <div v-for="item in dataList">
			      	<swiper :list="dataList" v-model="demo01_index" loop @on-index-change="demo01_onIndexChange"></swiper>
			      </div>
			    </mescroll-vue>
			</div>
	    </div> 
	</div>
</template>

<style type="text/css" lang="less">
	.mescroll {
	    position: fixed;
	    top: 70px;
	    bottom: 0;
	    height: auto;
	  }
	.flex-demo {
	  text-align: center;
	  font-size: 12px;
	  font-weight: bold;
	  svg{
	  	vertical-align: middle;
	  }
	  .iconfont{
	  	display: block;
	  }
	}
	.row{
		padding: 0 10px;
	}
	.row-price{
		.weui-cells{
			overflow: auto;
		}
		.weui-cells:after,.weui-cells:before{
			border:0;
		}
	}
	.v-transfer-dom .vux-popup-dialog{
		background: #fff;
	}
	.popup1 {
	  width:100%;
	  height:100%;
	  overflow-y: auto;
	  .wrap{
	  	padding: 0 10px;
	  	padding-bottom: 60px;
	  	.close{
	  		position: absolute;
	  		right: 20px;
	  	}
	  	.header{
	  		position: fixed;
	  		top: 0;
	  		line-height: 40px;
		    height: 40px;
		    background: #fff;
		    z-index:999;
		    left: 0;
		    right: 0;
	  	}
	  }
	  .weui-btn{
			border-radius: 0px;
		}
		.weui-btn_primary{
			background: #17BD88;
			&:active{
				background: #17BD88!important;
			}
		}
	  .vux-flexbox-item{
		background: #F8F8F8;
	  }
	  .flex-screen{
	  	padding: 10px 0;
	  	border-radius: 4px;
	  }
	  .cur{
	  	background: #17BD88;
	  	color: #fff;
	  }
	  .vux-flexbox-item{
		margin-right: 11px!important;
		margin-left: 0!important;
		margin-bottom: 11px;
	  }
	  .vux-flexbox-item:nth-child(4n+0){
	  	margin-right: 0!important;
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
	.number-style{
		.weui-cells{
			padding: 10px 0;
		}
		a.vux-number-selector{
			width: 30px;
		    height: 30px;
		    border-radius: 50%;
	        border: 1px solid #17BD88;
		    input{
		    	margin-top: 3px;
		    }
		    svg{
				margin-top: 2px;
				fill:#17BD88;
			}
		}
	}
	.bed{
		.weui-cells{
			margin-top: -1px!important;
		}
		
	}
	.btn-group{
		position: fixed;
		bottom:0;
		.vux-flexbox-item{
			margin-right: 0!important;
			margin-bottom: 0;
		}
	}
	.container{
		background: #ccc;
	}
</style>

<script>
	import DatePicker from "../components/datePiker.vue";
	import vueSlider from 'vue-slider-component';
	import MescrollVue from 'mescroll.js/mescroll.vue';
	import { Selector, Group, Sticky, Flexbox, FlexboxItem, Divider, Swiper, SwiperItem, Datetime, Popup, XSwitch, TransferDom,Cell, XNumber, XButton  } from 'vux'
	export default {
	  components: {
	  	vueSlider,
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
    	DatePicker,
    	Cell,
    	XNumber,
    	XButton,
    	MescrollVue
	  },
	  directives: {
	    TransferDom
	  },
	  data(){
	  	return {
  			demo01_index: 0,
	  		klass : true,
	  		value2: 1,
	  		value3: 1,
	  		index: 0,
	  		search: [],
	  		movieList : [],
	  		dateIsShow: false,  //时间控件显示隐藏
	  		screenIsShow : false, //筛选控件显示隐藏
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
		    jushiId:null,
		    houseTypeDate:[{id:1,text:"民居"},{id:2,text:"公寓"},{id:3,text:"独栋别墅"},{id:4,text:"客栈"},{id:5,text:"四合院"}],
		    houseTypeIds : [], //存选中的
		    deviceData : [{id:1,text:"冰箱",icon:"iconfont icon-bingxiang"},{id:2,text:"洗衣机",icon:"iconfont icon-xiyiji"},{id:3,text:"空调", icon:"iconfont icon-kongtiao"},{id:4,text:"暖气", icon:"iconfont icon-shuinuanqigongcheng"},{id:5,text:"电梯", icon:"iconfont icon-dianti"},{id:6,text:"停车场", icon:"iconfont icon-tingchewei"},{id:7,text:"WIFI", icon:"iconfont icon-wifi"}],
		    deviceIds:[],
		    priceValue :{
				value: [
				  150,
				  300
				],
				options:{
					width: "100%",
					height: 8,
					dotSize: 16,
					min: 0,
					max: 1000,
					disabled: false,
					show: true,
					useKeyboard: true,
					tooltip: "always",
					formatter: "¥{value}",
					mergeFormatter: "¥{value1} ~ ¥{value2}",
					bgStyle: {
					  "backgroundColor": "#fff",
					  "boxShadow": "inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)"
					},
					tooltipStyle: {
					  "backgroundColor": "#17BD88",
					  "borderColor": "#17BD88"
					},
					processStyle: {
					  "backgroundColor": "#17BD88"
					}
				}
			},
			pepleNum: 0, //人数
			bedNum: 0, //床数
			mescroll: null,
			mescrollDown:{},
			mescrollUp:{
				callback: this.upCallback,
				//isLock:true, //上啦刷新
			},
			dataList: [] // 列表数据
	  	}
	  },

	  beforeRouteEnter (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
	    next(vm => {
	      vm.$refs.mescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
	    })
	  },
	  beforeRouteLeave (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
	    this.$refs.mescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
	    next()
	  },

	  mounted(){
	  	this.moviescreening();
	  	//this.getHouseList();
	  	// console.log(this.calendar.begin)
	  	// console.log(this.calendar.end)
	  	this.calendar.select(this.calendar.begin,this.calendar.end)
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
	    onClickJushi (id) {
	    	console.log(id)
	    	this.jushiId=id
	    },
	    onClickHouseType (id) {
	    	//判断Id是否存在 不存在就push 存在就删除
	    	if(this.houseTypeIds.indexOf(id) <= -1){
	    		this.houseTypeIds.push(id);
	    		console.log(id)
	    	}else{
	    		let array = this.houseTypeIds;
	    		let index = array.indexOf(id);
	    		if(index > -1){
	    			array.splice(index, 1);
	    		}
	    	}
	    	console.log(this.houseTypeIds)
			
	    },
	    onClickDevice (id) {
	    	//判断Id是否存在 不存在就push 存在就删除
	    	if(this.deviceIds.indexOf(id) <= -1){
	    		this.deviceIds.push(id);
	    		console.log(id)
	    	}else{
	    		let array = this.deviceIds;
	    		let index = array.indexOf(id);
	    		if(index > -1){
	    			array.splice(index, 1);
	    		}
	    	}
	    	console.log(this.deviceIds)
			
	    },
	    onClosePop () {
	    	console.log(this)
			this.screenIsShow = false;
	    },
	    onChangePrice (val) {
	    	console.log('change', val)
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
	    //mescroll组件初始化的回调,可获取到mescroll对象
	    mescrollInit (mescroll) {
	      this.mescroll = mescroll
	    },
	    upCallback (page, mescroll) {
			      // 联网请求
	      this.axios.get('/api/index/houselist', {
	        params: {
	          num: page.num, // 页码
	          size: page.pageSize // 每页长度
	        }
	      }).then((response) => {
	      	//console.log(response.data.data)
	        // 请求的列表数据
	        let arr = response.data.data;
	        // 如果是第一页需手动制空列表
	        if (page.num === 1) this.dataList = []
	        // 把请求到的数据添加到列表
	        this.dataList = this.dataList.concat(arr)
	        // 数据渲染成功后,隐藏下拉刷新的状态
	        this.$nextTick(() => {
	          mescroll.endSuccess(arr.length)
	        })
	      }).catch((e) => {
	        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
	        mescroll.endErr()
	      })
	    },
	    //轮播图
	    demo01_onIndexChange (index) {
	      this.demo01_index = index
	    },
	    getHouseList () {
	    	this.axios.get('/api/index/houselist',{withCredentials:true})
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
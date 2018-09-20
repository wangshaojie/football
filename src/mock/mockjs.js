const Mock = require('mockjs');

const Random = Mock.Random;
 // mock一组数据
const listData = function (opt) {
   console.log('opt', opt);
   let articles = [];
   for (let i = 0; i < 30; i++) {
     let newArticleObject = {
       title: Random.csentence(5, 30),
       thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'),
       author_name: Random.cname(),
       date: Random.date() + ' ' + Random.time()
     }
     articles.push(newArticleObject)
   }
   return {
     data: articles
   }
 }

Mock.mock('/api/list', /post|get/i, listData);


const userInfo = function (opt) {
   console.log('opt', opt);
   var newArticleObject = {
		id: 1,
		name: "Leanne Graham",
		username: "Bret",
		email: "@EMAIL",
		token: "abcdefghijklmnopqrstuvwxyz",
		phone: "1-770-736-8031 x56442",
		website: "hildegard.org",
		company: {
			name: "Romaguera-Crona",
			catchPhrase: "Multi-layered client-server neural-net",
			bs: "harness real-time e-markets"
		}
	}
   return {
     data: newArticleObject
   }
 }

Mock.mock('/api/login', /post|get/i, userInfo);

/* 首页轮播图*/
const imglist = function (opt) {
   console.log('opt', opt);
   let imglist = [];
   for(let i = 0 ; i < 5; i++) {
   		let obj = {
   			url : Random.url(),
   			img: Random.dataImage('375x180', 'mock的图片'),
   			title : "Random.sentence(3, 5)"
   		} 
   		imglist.push(obj)
   }
   return {
      imglist
   }
 }

Mock.mock('/api/index/imglist', /post|get/i, imglist);
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/';
var async = require('async');
//app用户登录
// router.get('/list',function(res,req) {
// 	MongoClient.connect(url, {
//     useNewUrlParser: true
//   }, function(err, client){
//   	if (err) {
//       console.log('连接数据库失败', err)
//       //res.json 相当于res.send
//       res.json({
//         code: 1,
//         msg: '网络异常,请稍后重试'
//       })
//     } else {
//     	var db = client.db('maizuo');
//     	db.collection('user').find(param).count(function(err, num) {
//             if (err) {
//               res.json({
// 				        code: 1,
// 				        msg: '网络异常,请稍后重试'
// 				      })
//             } else {
//             }
//     }
//   }
// });


module.exports = router;
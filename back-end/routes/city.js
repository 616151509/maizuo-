var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/';
//获取影片信息
router.get('/list', function(req, res) {
      MongoClient.connect(url, {
            useNewUrlParser: true
          }, function(err, client) {
            if (err) {
              console.log('连接数据库失败', err)
              res.json({
                msg: '网络异常,请稍后重试'
              })
            } else {
              var db = client.db('maizuo');
              db.collection('city').find().toArray(function(err, data) {
                  if (err) {
                    console.log('连接数据库失败', err)
                    res.json({
                      msg: '网络异常,请稍后重试'
                    })
                  } else {
                    res.json({
                      code: 0,
                      data: {
                        films: data
                      }
                    })
                  }
                  client.close();
                })
              }
            })
          })

module.exports = router;
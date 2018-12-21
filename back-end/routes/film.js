var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/';
var async = require('async');
//获取图片
router.get('/list', function(req, res) {
  var pageNum = parseInt(req.query.pageNum) || 1; //当前第几页
  var pageSize = parseInt(req.query.pageSize) || 10; //一页显示多少条
  var type = parseInt(req.query.type) || 1;
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function(err, client) {
    if (err) {
      console.log('连接数据库失败', err)
      //res.json 相当于res.send
      res.json({
        code: 1,
        msg: '网络异常,请稍后重试'
      })
    } else {
      var db = client.db('maizuo');
      if (type === 1) {
        //正在热映
        param = {
          premiereAt: {
            $lt: new Date().getTime() / 1000
          }
        }
      } else {
        //即将上映
        param = {
          premiereAt: {
            $gte: new Date().getTime() / 1000
          }
        }
      }
      async.waterfall([
        function(cb) {
          db.collection('films').find(param).count(function(err, num) {
            if (err) {
              cb(err)
            } else {
              //num数据总条数
              cb(null, num)
            }
          })
        },

        function(num, cb) {
          if (type === 1) {
            //正在热映
            param = {
              premiereAt: {
                $lt: new Date().getTime() / 1000
              }
            }
          } else {
            //即将上映
            param = {
              premiereAt: {
                $gte: new Date().getTime() / 1000
              }
            }
          }
          db.collection('films').find(param).skip((pageNum - 1) * pageSize).limit(pageSize).toArray(function(err, data) {
            if (err) {
              cb(err)
            } else {
              cb(null, {
                num: num,
                data: data
              })
            }
          })
        }
      ], function(err, result) {
        if (err) {
          console.log(err);
          res.json({
            code: 1,
            msg: '错误'
          })
        } else {
          res.json({
            code: 0,
            msg: 'ok',
            data: {
              films: result.data,
              total: result.num
            }
          })
        }
        client.close();
      })
    }
  })

});

module.exports = router;
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Goods = require('../models/goods')

// 链接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/webstore')

mongoose.connection.on('connected', () => {
    console.log('链接成功')
})

mongoose.connection.on('error', () => {
    console.log('链接错误')
})

mongoose.connection.on('disconnected', () => {
    console.log('连接失败')
})

/* GET users listing. */
router.get('/', function(req, res, next) {
    Goods.find({}, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
});

module.exports = router;
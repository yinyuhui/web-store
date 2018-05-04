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
    let page = parseInt(req.param('page'))
    let pageSize = parseInt(req.param('pageSize'))
    let sort = req.param('sort')
    let skip = (page - 1) * pageSize
    let params = {}
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize)

    if (req.param('sort')) {
        goodsModel.sort({ 'salePrice': sort })
    }

    goodsModel.exec((err, doc) => {
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
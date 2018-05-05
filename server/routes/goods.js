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
    let page = parseInt(req.param('page')),
        pageSize = parseInt(req.param('pageSize')),
        sort = req.param('sort'),
        skip = (page - 1) * pageSize,
        priceLevel = req.param('priceLevel'),
        priceGt = 0,
        priceLte = 5000,
        params = {}

    if (priceLevel !== 'all') {
        switch (priceLevel) {
            case '0':
                {
                    priceGt = 0
                    priceLte = 100
                    break
                }
            case '1':
                {
                    priceGt = 100
                    priceLte = 500
                    break
                }
            case '2':
                {
                    priceGt = 500
                    priceLte = 1000
                    break
                }
            case '3':
                {
                    priceGt = 1000
                    priceLte = 2000
                    break
                }
            case '4':
                {
                    priceGt = 2000
                    priceLte = 5000
                    break
                }
        }
        params = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLte
            }
        }
    }

    let goodsModel = Goods.find(params).skip(skip).limit(pageSize)

    if (req.param('sort') === '1' || req.param('sort') === '-1') {
        goodsModel.sort({ 'salePrice': sort })
    }

    goodsModel.exec((err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            // console.log(doc)
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
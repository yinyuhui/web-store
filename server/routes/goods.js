var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Goods = require('../models/goods')

// 连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/webstore')

mongoose.connection.on('connected', () => {
    console.log('连接成功')
})

mongoose.connection.on('error', () => {
    console.log('连接错误')
})

mongoose.connection.on('disconnected', () => {
    console.log('连接失败')
})

// 查询商品列表数据
router.get('/list', function(req, res, next) {
    let page = parseInt(req.query.page),
        pageSize = parseInt(req.query.pageSize),
        sort = req.query.sort,
        skip = (page - 1) * pageSize,
        priceLevel = req.query.priceLevel,
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

    if (sort === '1' || sort === '-1') {
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

// 加入购物车
router.post('/addCart', (req, res, next) => {
    let userId = 'user0001',
        productId = req.body.productId,
        User = require('../models/user')

    User.findOne({ // 查找用户
        userId: userId
    }, (err, userDoc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            if (userDoc) { // 找到该用户的集合

                // 看看是不是已经放在购物车里了
                let goodsItem = ''
                userDoc.cartList.forEach(item => {
                    if (item.productId === productId) {
                        goodsItem = item
                        item.productNum++
                    }
                });

                // 已经存在就直接添加
                if (goodsItem) {
                    userDoc.save((err2, doc2) => {
                        if (err2) {
                            res.json({
                                status: '1',
                                mag: err2.message
                            })
                        } else {
                            res.json({
                                status: '0',
                                msg: '',
                                result: 'success'
                            })
                        }
                    })
                } else { // 否则新增
                    Goods.findOne({ productId: productId }, (err1, doc) => {
                        if (err1) {
                            res.json({
                                status: '1',
                                mag: err1.message
                            })
                        } else {
                            if (doc) { // 在goods库里查找该商品
                                doc.productNum = 1
                                doc.checked = 1
                                userDoc.cartList.push(doc)
                                userDoc.save((err2, doc2) => {
                                    if (err2) {
                                        res.json({
                                            status: '1',
                                            mag: err2.message
                                        })
                                    } else {
                                        res.json({
                                            status: '0',
                                            msg: '',
                                            result: 'success'
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        }
    })
})

module.exports = router;
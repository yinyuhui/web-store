var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Goods = require('../models/goods')
let qiniu = require('qiniu')

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
router.post('/list', function(req, res, next) {
    let page = parseInt(req.body.page),
        pageSize = parseInt(req.body.pageSize),
        sort = req.body.sort,
        classify = req.body.classify,
        skip = (page - 1) * pageSize,
        priceLevel = req.body.priceLevel,
        priceGt = 0,
        priceLte = 5000,
        params = {},
        name = req.body.name,
        reg = new RegExp(name, 'i')
        // console.log(reg)
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
        case 'all':
            {
                priceGt = 0
                priceLte = 5000
                break
            }
    }
    if (classify !== 'all') {
        params = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLte
            },
            productName: { $regex: reg },
            classify: classify
        }
    } else {
        params = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLte
            },
            productName: { $regex: reg }
        }
    }

    // console.log(params)
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize)

    if (sort === '1' || sort === '-1') {
        goodsModel.sort({
            'salePrice': sort
        })
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
    let userId = req.cookies.userId,
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
                    Goods.findOne({
                        productId: productId
                    }, (err1, doc) => {
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


// 获取Token
router.get('/getToken', (req, res, next) => {
    let accessKey = 'qTESawHglN2ERpMchILr8Rq7XztdDk09jkwFz19r'
    let secretKey = 'BMXGIpNOF51rAnnvBK7h43ojgD0cn379qjpWkIuv'
    let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    let bucket = 'blog'
    let options = {
        scope: bucket,
        expires: 72000000000
    }
    let putPolicy = new qiniu.rs.PutPolicy(options)
    let uploadToken = putPolicy.uploadToken(mac);
    res.json({
        status: '0',
        msg: '',
        result: {
            uploadToken: uploadToken
        }
    })
})


// 新增商品
router.post('/addProduct', (req, res, next) => {
    let obj = {
        productName: req.body.productName,
        describe: req.body.describe,
        salePrice: req.body.salePrice,
        productImage: req.body.productImage,
        classify: req.body.classify,
        productId: '' + new Date().Format('yyyyMMddhhmmss')

    }

    Goods.create(obj, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                mag: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: 'success'
            })
        }
    })
})

// 得到所有商品信息
router.get('/productList', function(req, res, next) {
    Goods.find({}, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                mag: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: doc
            })
        }
    })
})

// 删除商品
router.post('/productDel', (req, res, next) => {
    let productId = req.body.productId
    Goods.remove({
        productId: productId
    }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: 'success'
            })
        }
    })
})

// 根据商品ID查找商品
router.post('/productDetail', (req, res, next) => {
    let productId = req.body.productId
    Goods.findOne({
        productId: productId
    }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: doc
            })
        }
    })
})

// 编辑商品
router.post('/editProduct', (req, res, next) => {
    let productId = req.body.productId,
        productName = req.body.productName,
        describe = req.body.describe,
        salePrice = req.body.salePrice,
        classify = req.body.classify,
        productImage = req.body.productImage

    Goods.update({
        productId: productId
    }, {
        productId: productId,
        productName: productName,
        describe: describe,
        salePrice: salePrice,
        classify: classify,
        productImage: productImage
    }, (err, num) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: num
            })
        }
    })

})
module.exports = router;
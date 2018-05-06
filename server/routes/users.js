var express = require('express');
var router = express.Router();
var User = require('./../models/user')
    /* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


// 登录接口
router.post('/login', (req, res, next) => {
    // 查询条件
    let param = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    }

    console.log(param)

    // 查询
    User.findOne(param, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            if (doc) {
                res.cookie('userId', doc.userId, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                })
                res.cookie('userName', doc.userName, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                })

                // req.session.user = doc
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        userName: doc.userName
                    }
                })
            } else {
                res.json({
                    status: '1',
                    msg: '信息错误未查询到'
                })
            }
        }
    })
})

// 登出接口
router.post('/logout', (req, res, next) => {
    res.cookie('userId', '', {
        path: '/',
        maxAge: -1
    })
    res.json({
        status: '0',
        msg: '',
        result: ''
    })
})

// 验证登陆
router.get('/checkLogin', (req, res, next) => {
    if (req.cookies.userId) {
        res.json({
            status: '0',
            msg: '',
            result: req.cookies.userName || ''
        })
    } else {
        res.json({
            status: '1',
            msg: '未登录',
            result: ''
        })
    }
})

// 查询购物车信息
router.get('/cartList', (req, res, next) => {
    let userId = req.cookies.userId
    User.findOne({ userId: userId }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '',
                    result: doc.cartList
                })
            }
        }
    })
})

// 删除商品
router.post('/cartDel', (req, res, next) => {
    let userId = req.cookies.userId,
        productId = req.body.productId
    User.update({
        userId: userId
    }, {
        $pull: {
            'cartList': {
                'productId': productId
            }
        }
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

// 编辑商品数量，修改是否选中
router.post('/cartEdit', (req, res, next) => {
    let userId = req.cookies.userId,
        productId = req.body.productId,
        productNum = req.body.productNum,
        checked = req.body.checked

    User.update({
        'userId': userId,
        'cartList.productId': productId
    }, {
        'cartList.$.productNum': productNum,
        'cartList.$.checked': checked,
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

// 商品是否全选
router.post('/cartCheckAll', (req, res, next) => {
    let userId = req.cookies.userId,
        isCheckAll = req.body.isCheckAll ? '1' : '0'

    User.findOne({ userId: userId }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            if (doc) {
                doc.cartList.forEach(item => {
                    item.checked = isCheckAll
                });
                doc.save((err1, doc1) => {
                    if (err) {
                        res.json({
                            status: '1',
                            msg: err.message
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
})

module.exports = router;
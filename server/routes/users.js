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
                    status: '1',
                    msg: '',
                    result: doc.cartList
                })
            }
        }
    })
})

module.exports = router;
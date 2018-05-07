require('./../util/util')

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
    User.findOne({
        userId: userId
    }, (err, doc) => {
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

    User.findOne({
        userId: userId
    }, (err, doc) => {
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

// 查询用户地址
router.get('/addressList', (req, res, next) => {
    let userId = req.cookies.userId

    User.findOne({
        userId: userId
    }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: doc.addressList
            })
        }
    })
})

// 设置默认地址
router.post('/setDefaultAddress', (req, res, next) => {
    let userId = req.cookies.userId,
        addressId = req.body.addressId

    if (!addressId) {
        res.json({
            status: '1',
            msg: err.message
        })
    } else {
        User.findOne({
            userId: userId
        }, (err, doc) => {
            if (err) {
                res.json({
                    status: '1',
                    msg: '没有地址ID'
                })
            } else {
                let addressList = doc.addressList
                addressList.forEach(item => {
                    if (item.addressId === addressId) {
                        item.isDefault = true
                    } else {
                        item.isDefault = false
                    }
                })

                doc.save((err1, doc1) => {
                    if (err1) {
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
        })
    }
})

// 删除地址
router.post('/addressDel', (req, res, next) => {
    let userId = req.cookies.userId,
        addressId = req.body.addressId
    User.update({
        userId: userId
    }, {
        $pull: {
            'addressList': {
                'addressId': addressId
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

// 创建订单
router.post('/payment', (req, res, next) => {
    let userId = req.cookies.userId,
        orderTotal = req.body.orderTotal,
        addressId = req.body.addressId,
        shipping = req.body.shipping,
        discount = req.body.discount,
        tax = req.body.tax
    User.findOne({
        userId: userId
    }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            let address = ''

            // 获取用户地址信息
            if (doc.addressList.length > 0) {
                doc.addressList.forEach((item) => {
                    if (addressId === item.addressId) {
                        address = item
                    }
                })
            }

            let goodsList = []

            // 获取用户购物车的购买商品
            doc.cartList.forEach((item) => {
                if (item.checked === '1') {
                    goodsList.push(item)
                }
            })

            let r1 = Math.floor(Math.random() * 10)
            let r2 = Math.floor(Math.random() * 10)
            let sysDate = new Date().Format('yyyyMMddhhmmss')
            let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
            let platform = '682'
            let orderId = platform + r1 + sysDate + r2

            let order = {
                orderId: orderId,
                orderTotal: orderTotal,
                addressInfo: address,
                goodsList: goodsList,
                orderStatus: '1',
                createDate: createDate,
                shipping: shipping,
                discount: discount,
                tax: tax
            }

            doc.orderList.push(order)

            doc.save((err1, doc1) => {
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
                        result: {
                            orderId: order.orderId,
                            orderTotal: order.orderTotal
                        }
                    })
                }
            })
        }
    })
})

// 根据订单 ID 查询订单信息
router.get('/orderDetail', (req, res, next) => {
    let userId = req.cookies.userId,
        orderId = req.query.orderId

    User.findOne({
        userId: userId
    }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            let orderList = doc.orderList
            if (orderList.length > 0) {
                let orderTotal = 0
                let orderDetail = {}
                orderList.forEach(item => {
                    if (item.orderId === orderId) {
                        orderTotal = item.orderTotal
                        orderDetail = item
                    }
                })
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        orderTotal: orderTotal,
                        orderId: orderId,
                        orderDetail: orderDetail
                    }
                })
            } else {
                res.json({
                    status: '1003',
                    msg: '无此订单',
                    result: ''
                })
            }
        }
    })
})

// 根据地址 ID 查询地址信息
router.post('/addressDetail', (req, res, next) => {
    let userId = req.cookies.userId,
        addressId = req.body.addressId

    User.findOne({
        userId: userId
    }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            let addressList = doc.addressList
                // console.log(addressList)
            if (addressList.length > 0) {
                // let orderTotal = 0
                let userName = '',
                    tel = '',
                    streetName = ''

                addressList.forEach(item => {
                    if (item.addressId === addressId) {
                        userName = item.userName
                        tel = item.tel
                        streetName = item.streetName
                    }
                })
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        userName: userName,
                        tel: tel,
                        streetName: streetName
                    }
                })
            } else {
                res.json({
                    status: '1004',
                    msg: '无此地址',
                    result: ''
                })
            }
        }
    })
})


// 编辑地址
router.post('/addressEdit', (req, res, next) => {
    let userId = req.cookies.userId,
        addressId = req.body.addressId,
        userName = req.body.userName,
        tel = req.body.tel,
        streetName = req.body.streetName

    User.update({
        'userId': userId,
        'addressList.addressId': addressId
    }, {
        'addressList.$.addressId': addressId,
        'addressList.$.userName': userName,
        'addressList.$.tel': tel,
        'addressList.$.streetName': streetName,
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

// 新增地址
router.post('/addNewAddress', (req, res, next) => {
    let userId = req.cookies.userId,
        userName = req.body.userName,
        tel = req.body.tel,
        streetName = req.body.streetName

    User.findOne({
        userId: userId
    }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            let r1 = Math.floor(Math.random() * 10),
                r2 = Math.floor(Math.random() * 10),
                sysDate = new Date().Format('yyyyMMddhhmmss'),
                platform = '682',
                addressId = platform + r1 + sysDate + r2

            let address = {
                addressId: addressId,
                userName: userName,
                tel: tel,
                streetName: streetName
            }

            doc.addressList.push(address)

            doc.save((err1, doc1) => {
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
                        result: {
                            addressId: address.addressId,
                        }
                    })
                }
            })
        }
    })
})

// 查询用户订单信息
router.get('/orderList', (req, res, next) => {
    let userId = req.cookies.userId

    User.findOne({
        userId: userId
    }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: doc.orderList
            })
        }
    })
})

// 删除订单
router.post('/orderDel', (req, res, next) => {
    let userId = req.cookies.userId,
        orderId = req.body.orderId
    User.update({
        userId: userId
    }, {
        $pull: {
            'orderList': {
                'orderId': orderId
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
module.exports = router;
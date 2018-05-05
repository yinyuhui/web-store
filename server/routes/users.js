var express = require('express');
var router = express.Router();
var User = require('./../models/user')
    /* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

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

module.exports = router;
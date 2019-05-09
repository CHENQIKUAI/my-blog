var express = require('express');
const sha1 = require('sha1')
const userFunc = require('../models/users');
const checkNotLogin = require('../middlewares/check').checkNotLogin;
var router = express.Router();

/* GET users listing. */
router.get('/', checkNotLogin, (req, res, next) => {
    res.render('signin')
});

router.post('/', checkNotLogin, function (req, res, next) {
    const email = req.fields.email;
    const password = sha1(req.fields.password);
    const msg = { email: email, password: password };
    userFunc.getUserByMsg(msg).then((doc) => {
        if (doc.length == 1) { //登录成功
            req.flash('success', "登录成功")
            req.session.email = email;
            req.session.nickname = doc[0].nickname;
            req.session.avatar = doc[0].avatar;

            res.redirect('posts');
        } else {
            req.flash('error', "账号或密码错误");
            res.redirect('back');
        }
    }).catch((err) => {
        console.log(err);
    });

});

module.exports = router;

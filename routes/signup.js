var express = require('express');
const path = require('path')
const sha1 = require('sha1')
const userFunc = require('../models/users')
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('signup');
});

router.post('/', function (req, res, next) {
    req.session.email = req.fields.email;
    const email = req.fields.email;
    const nickname = req.fields.nickname;
    const password = sha1(req.fields.password);
    const avatar = 'req.files.avatar.path.split(path.sep).pop()'

    const user = {
        email: email,
        nickname: nickname,
        password: password,
        avatar: avatar
    }
    userFunc.create(user).then((result) => {
        res.redirect('posts');
        delete user.password;
    }).catch((err) => {
        res.send(JSON.stringify(err));
    });
});

module.exports = router;

var express = require('express');
const sha1 = require('sha1')
const postFunc = require('../models/posts');
const checkLogin = require('../middlewares/check').checkLogin;
var router = express.Router();




/* GET users listing. */
router.get('/', checkLogin, (req, res, next) => {
    res.render('write')
});

router.post('/', checkLogin, function (req, res, next) {
    const title = req.fields.title;
    const content = req.fields.content;
    console.log(title, content);

    postFunc.getAll().then((result) => {
        let id = 0;
        if (result.length != 0) {
            id = result[result.length - 1].id + 1
        }
        const post = {
            id: id,
            email: req.session.email,
            avatar: req.session.avatar,
            nickname: req.session.nickname,
            title: title,
            content: content,
            view: 0,
            like: 0
        }
        postFunc.create(post).then((result) => {
            res.redirect('posts');
        }).catch((err) => {
            res.send(err);
        });;
    }).catch((err) => {

    });



});

module.exports = router;

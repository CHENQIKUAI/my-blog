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
        const post = {
            id: result.length + 1,
            email: req.session.email,
            title: title,
            content: content,
            view: 0
        }
        console.log(post);
        postFunc.create(post).then((result) => {
            res.redirect('posts');
        }).catch((err) => {
            res.send(err);
        });;
    }).catch((err) => {

    });



});

module.exports = router;

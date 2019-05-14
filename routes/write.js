var express = require('express');
const sha1 = require('sha1')
const postFunc = require('../models/posts');
const checkLogin = require('../middlewares/check').checkLogin;
var router = express.Router();


router.get('/', checkLogin, (req, res, next) => {
    res.render('write')
});


router.get('/:id', checkLogin, (req, res, next) => {
    postFunc.getPostById(Number(req.params.id)).then((result) => {
        const post = result[0];
        console.log(post)
        res.render('write', { post: post });
    }).catch((err) => {
        res.send(err);
    });
})


router.post('/', checkLogin, function (req, res, next) {
    const title = req.fields.title;
    const content = req.fields.content;

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
        res.send(err)
    });
});


router.post('/:id', checkLogin, function (req, res, next) {
    const title = req.fields.title;
    const content = req.fields.content;
    const id = req.params.id;
    postFunc.modifyPost(id, title, content);
    res.redirect(`/posts/${id}`);
});

module.exports = router;

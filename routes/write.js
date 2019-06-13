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
        if (post.email === req.session.email) {
            res.render('write', { post: post });
        } else {
            res.redirect('back');
        }
    }).catch((err) => {
        res.send(err);
    });
})

//发布文章
router.post('/', checkLogin, function (req, res, next) {
    const title = req.fields.title;
    const content = req.fields.content;

    postFunc.getAll().then((result) => {
        let id = 0;
        if (result.length != 0) {
            id = result[0].id + 1
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
            req.flash('success', '发布成功');
            res.redirect('/posts');
        }).catch((err) => {
            res.send(err);
        });;
    }).catch((err) => {
        res.send(err)
    });
});

//更改发布的文章
router.post('/:id', checkLogin, function (req, res, next) {
    const title = req.fields.title;
    const content = req.fields.content;
    const id = req.params.id;
    postFunc.modifyPost(id, title, content);
    req.flash('success', "修改成功");
    res.redirect(`/posts/${id}`);
});

//删除发布的文章
router.post('/:id/delete', checkLogin, (req, res, next) => {
    const id = Number(req.params.id);
    postFunc.deletePost(id).then((result) => {
        req.flash('success', '取消发布成功');
        res.redirect('/posts');
    }).catch((err) => {
        res.send(err);
    });
})

module.exports = router;

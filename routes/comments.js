var express = require('express');
const mongoose = require('mongoose');
const commentFunc = require('../models/comments');
const postFunc = require('../models/posts');
var router = express.Router();

//获得 评论
router.get('/', function (req, res, next) {

});

//提交 评论
router.post('/add', (req, res, next) => {

    const author = { nickname: req.fields.nickname, avatar: req.fields.avatar, email: req.fields.email };
    const content = req.fields.content;
    const postId = req.fields.postId;

    const cmt = {
        author: author,
        content: content,
        postId: postId
    }

    commentFunc.AddComment(cmt).then((result) => {
        res.redirect(`/posts/${postId}`);
    }).catch((err) => {
        res.send(err);
    });
})

//删除评论
router.get('/remove/:_id', (req, res, next) => {
    const _id = req.params._id;
    commentFunc.removeCommentById(mongoose.Types.ObjectId(_id)).then((result) => {
        res.redirect('back');
    }).catch((err) => {
        res.send('error');
    });;
})


module.exports = router;

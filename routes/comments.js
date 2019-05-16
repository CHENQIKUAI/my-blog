var express = require('express');
const commentFunc = require('../models/comments');
var router = express.Router();

//获得 评论
router.get('/', function (req, res, next) {

});

//提交 评论
router.post('/add', (req, res, next) => {
    const author = req.fields.author;
    const content = req.fields.content;
    const postId = req.fields.postId;

    const cmt = {
        author: author,
        content: content,
        postId: postId
    }

    commentFunc.AddComment(cmt).then((result) => {
        res.redirect('back');
    }).catch((err) => {
        res.send(err);
    });
})

//删除评论
router.post('/remove', (req, res, next) => {


})


module.exports = router;

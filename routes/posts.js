var express = require('express');
var router = express.Router();
const postFunc = require('../models/posts');
const commentFunc = require('../models/comments');
const hot = require('../models/hot');


Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

/* GET users listing. */
router.get('/', async (req, res, next) => {

    let posts = await postFunc.getAll();
    let posts2 = await hot.sortByComments();
    let posts3 = await hot.sortByLikes();
    let posts4 = await hot.sortByViews();
    let data = { posts: posts, hotPostByComments: posts2, hotPostByViews: posts4, hotPostByLikes: posts3 };
    res.render('posts', data);

});

router.get('/:id', function (req, res, next) {
    const id = Number(req.params.id);
    postFunc.viewPlus(id);

    Promise.all([
        postFunc.getPostById(id),
        commentFunc.getCommentsByPostId(id)
    ]).then((result) => {
        const post = result[0][0];
        const comments = result[1];

        post.calc = post.content.length;
        post.time = post.created.format('yyyy.MM.dd hh:mm');

        for (let i = 0; i < comments.length; ++i) {
            comments[i].time = comments[i].created.format('yyyy.MM.dd hh:mm');
        }

        const data = {
            post: post,
            comments: comments
        }
        res.render('post', data);

    }).catch((err) => {
        res.send(err);
    });

});

router.get('/:id/like', (req, res, next) => {
    postFunc.like(req.params.id);
    res.redirect('back');
});


router.post('/', function (req, res, next) {
    res.send('posts')
});

module.exports = router;

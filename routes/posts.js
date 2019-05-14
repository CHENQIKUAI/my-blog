var express = require('express');
const postFunc = require('../models/posts');
var router = express.Router();
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
router.get('/', function (req, res, next) {
    postFunc.getAll().then((result) => {
        result.reverse();
        res.render('posts', { posts: result });
    }).catch((err) => {
        res.send(err);
    });;

});

router.get('/:id', function (req, res, next) {
    const id = req.params.id;

    postFunc.getPostById(id).then((result) => {
        const post = result[0];
        post.calc = post.content.length;
        post.time = post.created.format('yyyy.MM.dd hh:mm');

        res.render('post', { post: post })
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

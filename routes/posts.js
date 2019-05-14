var express = require('express');
const postFunc = require('../models/posts');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    postFunc.getAll().then((result) => {
        res.render('posts', { posts: result });

    }).catch((err) => {
        res.send(err);
    });;

});

router.get('/:id', function (req, res, next) {
    const id = req.params.id;
    postFunc.getPostById(id, res);
});


router.post('/', function (req, res, next) {
    res.send('posts')
});

module.exports = router;

var express = require('express');
const postFunc = require('../models/posts');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    // postFunc.getAll().then((result) => {
    //     res.send(result);
    // }).catch((err) => {
    //     res.send(err);
    // });;

    res.render('posts');
});

router.post('/', function (req, res, next) {
    res.send('posts')
});

module.exports = router;

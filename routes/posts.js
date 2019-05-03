var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('posts');
});

router.post('/', function (req, res, next) {
    res.send('posts')
});

module.exports = router;

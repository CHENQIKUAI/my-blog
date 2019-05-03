var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    req.session.email = null;
    req.flash('success', "退出成功");
    res.redirect('posts');
});


module.exports = router;

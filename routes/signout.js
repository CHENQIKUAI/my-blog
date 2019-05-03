var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    req.session.email = null;
    res.redirect('posts');
});


module.exports = router;

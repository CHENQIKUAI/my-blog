var express = require('express');
const sha1 = require('sha1')
const userFunc = require('../models/users');
const checkLogin = require('../middlewares/check').checkLogin;
var router = express.Router();

/* GET users listing. */
router.get('/', checkLogin, (req, res, next) => {
    res.render('write')
});

router.post('/', checkLogin, function (req, res, next) {
    const title = req.fields.title;
    const content = req.fields.content;
    console.log(title, content);
    
    const post = {
        
    }
    
    req.flash('success', '发布')
    res.send("lakjlsdjflkj")

});

module.exports = router;

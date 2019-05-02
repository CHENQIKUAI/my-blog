var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('signuot')
});

router.post('/', function(req, res, next) {
    res.send('signuot')
  });

module.exports = router;

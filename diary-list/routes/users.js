var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource users');
});

router.get('/list', function(req, res) {
  const list = [
    '영욱', '절구', '길동'
  ];
  res.send(list);
})

module.exports = router;

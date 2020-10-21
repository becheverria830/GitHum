var express = require('express');
var router = express.Router();

/*
/search?query=..
*/

router.get('/', function(req, res, next) {
  res.json({"foo": "bar"});
});

module.exports = router;

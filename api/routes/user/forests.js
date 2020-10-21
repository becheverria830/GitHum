var express = require('express');
var router = express.Router();

/*
/user/forests?userid=
/user/forests/saved?userid=
*/

router.get('/', function(req, res, next) {
  res.json({"foo": "bar"});
});

module.exports = router;

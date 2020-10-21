var express = require('express');
var router = express.Router();

/*
/user/favorites/songs
*/

router.get('/', function(req, res, next) {
  res.json({"foo": "bar"});
});

module.exports = router;

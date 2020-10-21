var express = require('express');
var router = express.Router();

/*
/user/friends
/user/friends/add
/user/friends/remove
/user/friends/request
*/

router.get('/', function(req, res, next) {
  res.status(200).json({
    "current_friends": [
      {
        "userid": 1,
        "username": "jeremy123",
        "firstname": "Jeremy",
        "lastname": "Herrmann"
      },
      {
        "userid": 2,
        "username": "isabelle123",
        "firstname": "Isabelle",
        "lastname": "Greenberg"
      },
      {
        "userid": 3,
        "username": "bridgett123",
        "firstname": "Bridgett",
        "lastname": "Echeverria"
      }
    ],
    "requests": {
      "sent":[
        {
          "userid": 4,
          "username": "eric123",
          "firstname": "Eric",
          "lastname": "Paez"
        },
        {
          "userid": 5,
          "username": "rahul123",
          "firstname": "Rahul",
          "lastname": "Sohndi"
        }
      ],
      "received": [
        {
          "userid": 6,
          "username": "brian123",
          "firstname": "Brian",
          "lastname": "Roberts"
        },
        {
          "userid": 7,
          "username": "kyle123",
          "firstname": "Kyle",
          "lastname": "Simon"
        }
      ]
    }
  });
});

router.post('/add', function(req, res, next) {
  res.status(200);
});

router.delete('/remove', function(req, res, next) {
  res.status(200);
});

router.post('/request', function(req, res, next) {
  res.status(200);
});

module.exports = router;

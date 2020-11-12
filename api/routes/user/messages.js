var express = require('express');
var mongoose = require('mongoose');
const models  = require("../models");

var router = express.Router();

const Message = models['message'];

router.post("/create", (req, res, err) => {
  const sender = req.body.sender;
  const receiver = req.body.receiver;
  const message = req.body.message;

  if(sender == undefined || receiver == undefined || message == undefined){
    res.status(400).send("Please try to send the message again, something happened!");
  } else {
    var message_data = {
      from_user: sender,
      to_user: receiver,
      timestamp: Date.now(),
      content: message
    }
    Message.insertMany([message_data], function(create_error, result) {
      if (create_error) throw create_error;
      res.status(200).send("success");
    });
  }
});

router.get('/:user1/:user2', function(req, res, next) {
  const user1 = req.params.user1;
  const user2 = req.params.user2;

  Message.aggregate([
    {
      $match : {
        "from_user": { $in: [ mongoose.Types.ObjectId(user1), mongoose.Types.ObjectId(user2) ] },
        "to_user": { $in: [ mongoose.Types.ObjectId(user1), mongoose.Types.ObjectId(user2) ] },
      }
    },
    {
      $lookup : {
        "from": "Users",
        "localField": "from_user",
        "foreignField": "_id",
        "as": "from_user"
      }
    },
    {
      $lookup : {
        "from": "Users",
        "localField": "to_user",
        "foreignField": "_id",
        "as": "to_user"
      }
    },
    {
      $project: {
        "from_user.friend": 0,
        "from_user.library": 0,
        "from_user.credentials": 0,
        "from_user.icon": 0,
        "to_user.friend": 0,
        "to_user.library": 0,
        "to_user.credentials": 0,
        "to_user.icon": 0
      }
    },
    {
      $sort: {
        "timestamp" : 1
      }
    }
  ], function(err, messages) {
    res.status(200).json(messages);
  });

});

module.exports = router;

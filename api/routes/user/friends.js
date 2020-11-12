var express = require("express");
var router = express.Router();

const models = require("../models");
const User = models["user"];

/*
/user/friends
/user/friends/add
/user/friends/remove
/user/friends/request
*/

router.get("/", function (req, res, next) {
  res.status(200).json({
    current_friends: [
      {
        userid: 1,
        username: "jeremy123",
        firstname: "Jeremy",
        lastname: "Herrmann",
      },
      {
        userid: 2,
        username: "isabelle123",
        firstname: "Isabelle",
        lastname: "Greenberg",
      },
      {
        userid: 3,
        username: "bridgett123",
        firstname: "Bridgett",
        lastname: "Echeverria",
      },
    ],
    requests: {
      sent: [
        {
          userid: 4,
          username: "eric123",
          firstname: "Eric",
          lastname: "Paez",
        },
        {
          userid: 5,
          username: "rahul123",
          firstname: "Rahul",
          lastname: "Sohndi",
        },
      ],
      received: [
        {
          userid: 6,
          username: "brian123",
          firstname: "Brian",
          lastname: "Roberts",
        },
        {
          userid: 7,
          username: "kyle123",
          firstname: "Kyle",
          lastname: "Simon",
        },
      ],
    },
  });
});

router.post("/add/:user1/:user2", function (req, res, next) {
  //take in id of current user and friend to add
  var userUsername = req.body.userUsername;
  var otherUsername = req.body.otherUsername;
  console.log("User " + userUsername + "wants to add User " + otherUsername);
  //look up for current user --> update the fields
  //look up potential friend
  res.status(200).json({});
  // res.status(200);
});

router.delete("/remove", function (req, res, next) {
  res.status(200);
});

router.post("/request", function (req, res, next) {
  res.status(200);
});

router.get("/search/:username", function (req, res, next) {
  User.find(
    { username: { $regex: req.params.username, $options: "i" } },
    function (err, docs) {
      if (err) {
        throw err;
      } else {
        res.status(200).json({
          users: docs,
        });
      }
    }
  );
});

module.exports = router;

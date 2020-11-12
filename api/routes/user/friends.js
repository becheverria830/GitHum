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

router.post("/add", function (req, res, next) {
  //take in id of current user and friend to add
  var userMain = req.body.userMain;
  var userOther = req.body.userOther;
  //Find main user
  User.findOne({ _id: userMain }, function (err, res_usermain) {
    if (err) {
      console.log(err);
    } else {
      // Find other user
      User.findOne({ _id: userOther }, function (err, res_userother) {
        if (err) {
          console.log(err);
        } else {
          // update main user's outgoing friend requests. How do I add to, not replace, outgoing?
          res_usermain.friend.outgoing_requests.push(userOther);
          User.update(
            { _id: res_usermain.id },
            {
              "friend.outgoing_requests": res_usermain.friend.outgoing_requests,
            },
            function (err, res_update) {
              if (err) {
                console.log(err);
              } else {
                // update other user's incoming friend request
                res_userother.friend.incoming_requests.push(userMain);
                User.update(
                  { _id: res_userother.id },
                  {
                    "friend.incoming_requests":
                      res_userother.friend.incoming_requests,
                  },
                  function (err, res_update) {
                    if (err) {
                      console.log(err);
                    } else {
                      res.status(200).json({});
                    }
                  }
                );
              }
            }
          );
        }
      });
    }
  });

  //look up for current user --> update the fields
  //look up potential friend

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

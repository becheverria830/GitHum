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

router.get("/:userid", function (req, res, next) {
  const userid = req.params.userid;

  User.findOne({ _id: userid })
    .populate("friend.list", "_id username first_name last_name")
    .populate("friend.incoming_requests", "_id username first_name last_name")
    .populate("friend.outgoing_requests", "_id username first_name last_name")
    .exec(function (err, user) {
      if (err) throw err;
      res.status(200).json(user.friend);
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
});

router.post("/remove", function (req, res, next) {
  var userMain = req.body.userMain;
  var userOther = req.body.userOther;
  //Find main user
  User.findOne({ _id: userMain }, function (err, res_usermain) {
    if (err) {
      console.log(err);
    } else {
      //Get User Other
      User.findOne({ _id: userOther }, function (err, res_userother) {
        if (err) {
          console.log(err);
        } else {
          //Update User Main's friends list w/o User Other
          console.log("res_userother: " + res_userother);
          var index = res_usermain.friend.list.indexOf(userOther);
          res_usermain.friend.list.splice(index, 1);
          User.update(
            { _id: res_usermain.id },
            {
              "friend.list": res_usermain.friend.list,
            },
            function (err, res_update) {
              if (err) {
                console.log(err);
              } else {
                //Update User Other's friends list w/o User Main
                console.log("res_userother: " + res_userother);
                var index = res_userother.friend.list.indexOf(userMain); //friend is null here
                res_userother.friend.list.splice(index, 1);
                User.update(
                  { _id: res_userother.id },
                  {
                    "friend.list": res_userother.friend.list,
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
});

router.post("/request/decline", function (req, res, next) {
  var userMain = req.body.userMain;
  var userOther = req.body.userOther;

  // Get User Main
  User.findOne({ _id: userMain }, function (err, res_usermain) {
    if (err) {
      console.log(err);
    } else {
      // Get User Other
      User.findOne({ _id: userOther }, function (err, res_userother) {
        if (err) {
          console.log(err);
        } else {
          // Delete incoming request from incoming of user main
          var index = res_usermain.friend.incoming_requests.indexOf(userOther);
          res_usermain.friend.incoming_requests.splice(index, 1);
          User.update(
            { _id: res_usermain.id },
            {
              "friend.incoming_requests": res_usermain.friend.incoming_requests,
            },
            function (err, res_update) {
              if (err) {
                console.log(err);
              } else {
                // Delete outgoing request from outgoing of user other
                var index = res_userother.friend.outgoing_requests.indexOf(
                  userMain
                );
                res_userother.friend.outgoing_requests.splice(index, 1);
                User.update(
                  { _id: res_userother.id },
                  {
                    "friend.outgoing_requests":
                      res_userother.friend.outgoing_requests,
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
});

router.post("/request/accept", function (req, res, next) {
  var userMain = req.body.userMain;
  var userOther = req.body.userOther;

  // Get User Main
  User.findOne({ _id: userMain }, function (err, res_usermain) {
    if (err) {
      console.log(err);
    } else {
      // Get User Other
      User.findOne({ _id: userOther }, function (err, res_userother) {
        if (err) {
          console.log(err);
        } else {
          // Delete incoming request from incoming of user main
          var index = res_usermain.friend.incoming_requests.indexOf(userOther);
          res_usermain.friend.incoming_requests.splice(index, 1);
          User.update(
            { _id: res_usermain.id },
            {
              "friend.incoming_requests": res_usermain.friend.incoming_requests,
            },
            function (err, res_update) {
              if (err) {
                console.log(err);
              } else {
                // Delete outgoing request from outgoing of user other
                var index = res_userother.friend.outgoing_requests.indexOf(
                  userMain
                );
                res_userother.friend.outgoing_requests.splice(index, 1);
                User.update(
                  { _id: res_userother.id },
                  {
                    "friend.outgoing_requests":
                      res_userother.friend.outgoing_requests,
                  },
                  function (err, res_update) {
                    if (err) {
                      console.log(err);
                    } else {
                      // Add user other to user main friends list
                      res_usermain.friend.list.push(userOther);
                      User.update(
                        { _id: res_usermain.id },
                        {
                          "friend.list": res_usermain.friend.list,
                        },
                        function (err, res_add_userother) {
                          if (err) {
                            console.log(err);
                          } else {
                            // Add user main to user other friend list
                            res_userother.friend.list.push(userMain);
                            User.update(
                              { _id: res_userother.id },
                              {
                                "friend.list": res_userother.friend.list,
                              },
                              function (err, res_add_usermain) {
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
                  }
                );
              }
            }
          );
        }
      });
    }
  });
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

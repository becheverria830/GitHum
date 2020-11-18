var express = require("express");
var mongoose = require("mongoose");
const models = require("../models");

var router = express.Router();

const Forest = models["forests"];
const User = models["user"];

/*
/user/forests?userid=
/user/forests/saved?userid=
/user/forests/friends?userid=
*/

router.post("/create", (req, res, err) => {
  const name = req.body.name;
  const userid = req.body.userid;
  console.log(name);
  console.log(userid);

  if (name == undefined || userid == undefined) {
    res.status(400).json({
      forest: null,
    });
  } else {
    var forest_data = {
      name: name,
      icon: "",
      active: true,
      children: [],
      depth: 1,
      creator: userid,
      songs: [],
      settings: {
        privacy: false,
      },
    };
    Forest.insertMany([forest_data], function (create_error, result) {
      if (create_error) throw create_error;
      console.log(result);
      res.status(200).json({
        forest: result[0],
      });
    });
  }
});

router.post("/byId/:fid/add", function (req, res, next) {
  const fid = req.body.forestid;
  const sid = req.body.userid;
  console.log(fid);
  console.log(sid);

  if (fid == undefined || sid == undefined) {
    res.status(400).json({
      forest: null,
    });
  } else {
    Forest.findOneAndUpdate({ _id: uid }, { $push: { songs: sid } }, function (
      err,
      result
    ) {
      if (err) throw err;
      res.status(200).json({});
    });
  }
});

router.post("/save", function (req, res, next) {
  const fid = req.body.forestid;
  // const fcreator = req.body.creator;
  const fcreator = ""; //FIX LATER
  const uid = req.body.userid;
  console.log(fid);
  console.log(uid);

  if (fid == undefined || uid == undefined) {
    res.status(400).json({
      forest: null,
    });
  } else if (fcreator == uid) {
    console.log(
      "You already have this Forest in your library - You made it in the first place!"
    );
    res.status(400).json({
      forest: null,
    });
  } else {
    User.findOneAndUpdate(
      { _id: uid },
      { $push: { "library.saved_forests": fid } },
      function (err, result) {
        if (err) throw err;
        res.status(200).json({});
      }
    );
  }
});

router.post("/addToForest", function (req, res, next) {
  // WORKS!
  const song_id = req.body.song_id;
  const forest_id = req.body.forest_id;

  Forest.findOne({ _id: forest_id }, function (err, res_find_forest) {
    if (err) {
      console.log(err);
    } else {
      res_find_forest.songs.push(song_id);
      Forest.update(
        { _id: forest_id },
        { songs: res_find_forest.songs },
        function (err, res_update_forest) {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({});
          }
        }
      );
    }
  });
});

router.post("/branchForest", function (req, res, next) {
  const branch_forest_name = req.body.branch_forest_name;
  const parent_forest_id = req.body.parent_forest_id;
  const user_id = req.body.user_id;

  // Get Parent Forest
  if (parent_forest_id == undefined) {
    res.status(400).json({
      forests: [],
    });
  } else {
    Forest.findOne({ _id: parent_forest_id }, function (err, res_find_parent) {
      var parent_forest_songs = res_find_parent.songs;
      var branch_depth = res_find_parent.depth + 1;
      var branch_forest_data = {
        name: branch_forest_name,
        icon: "",
        active: true,
        children: [],
        depth: branch_depth,
        creator: user_id,
        songs: parent_forest_songs,
        settings: {
          privacy: false,
        },
      };
      //
      // Create Branch Forest (Forest.insertMany)
      Forest.insertMany([branch_forest_data], function (
        create_error,
        res_insert_forest
      ) {
        if (create_error) {
          throw create_error;
        } else {
          //
          // Update Parent.children
          res_find_parent.children.push(res_insert_forest[0]._id);
          Forest.update(
            { _id: res_find_parent.id },
            {
              children: res_find_parent.children,
            },
            function (err, res_update_children) {
              if (create_error) {
                throw create_error;
              } else {
                res.status(200).json({});
              }
            }
          );
        }
      });
    });
  }

  //
});

router.get("/forests/:userid", function (req, res, next) {
  console.log("inside here");
  //Getting the information from the request
  const userid = req.params.userid;

  if (userid == undefined) {
    //Throwing an exception if user didn't supply all the information.
    res.status(400).json({
      forests: [],
    });
  } else {
    //Finding if a user with the email exists already
    Forest.find({ creator: userid }, function (find_error, forests) {
      if (find_error) throw find_error;

      refined_forests = [];
      for (forest of forests) {
        refined_forests.push(forest);
      }
      res.status(200).json({
        forests: refined_forests,
      });
    });
  }
});

router.get("/:forestid", function (req, res, next) {
  var id = req.params.forestid;

  if (id == undefined) {
    //Throwing an exception if user didn't supply all the information.
    res.status(400).json({
      forests: [],
    });
  } else {
    Forest.findOne({ _id: id })
      .populate("songs")
      .exec(function (err, forest) {
        if (err) throw err;
        console.log(forest);
        res.status(200).json({
          forests: forest,
        });
      });
  }
});

router.get("/saved/:userid", function (req, res, next) {
  var userid = req.params.userid;

  if (userid == undefined) {
    //Throwing an exception if user didn't supply all the information.
    res.status(400).json({
      forests: [],
    });
  } else {
    //Finding if a user with the email exists already
    User.findOne({ _id: userid })
      .populate("library.saved_forests")
      .exec(function (err, user) {
        if (err) throw err;
        res.status(200).json({
          forests: user.library.saved_forests,
        });
      });
  }
});

router.get("/friends/:userid", function (req, res, next) {
  //Get all the friends of the user
  const userid = req.params.userid;

  if (userid == undefined) {
    res.status(200).json({
      forests: [],
    });
  } else {
    User.find({ _id: userid }, function (find_error, users) {
      if (find_error) throw find_error;
      //Checking if the user existed, if not creating an entry for them.
      if (users.length == 0) {
        res.status(200).json({
          forests: [],
        });
      } else {
        //Getting all the friends for the current user
        updated_friends_list = users[0].friend.list.map((friend) =>
          mongoose.Types.ObjectId(friend)
        );
        Forest.aggregate(
          [
            {
              $match: {
                creator: { $in: updated_friends_list },
              },
            },
            {
              $lookup: {
                from: "Users",
                localField: "creator",
                foreignField: "_id",
                as: "creator",
              },
            },
            {
              $project: {
                "creator.friend": 0,
                "creator.library": 0,
                "creator.credentials": 0,
                "creator.icon": 0,
              },
            },
          ],
          function (err, forests) {
            res.status(200).json({ forests: forests });
          }
        );
      }
    });
  }
});

module.exports = router;

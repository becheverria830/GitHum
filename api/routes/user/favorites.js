var express = require("express");
var mongoose = require('mongoose');
const models = require("../models");

var router = express.Router();

const User = models["user"];
const Forest = models["forests"];
const Song = models["song"];

/*
/user/favorites/songs
*/

// Turn a song into a favorite
router.post("/add", function (req, res, next) {
  // Check that the strings are valid
  const userid = req.body.userid;
  const songid = req.body.songid;

  if (songid == undefined || userid == undefined) {
    res.status(400).json({});
  } else {
    User.findOneAndUpdate({_id : userid}, { $push: {'library.favorites': songid} }, function (err, result) {
      if (err) throw err;
      res.status(200).json({});
    });
  }
  // Check if song has an object already

  // If So, then just add that _id to user.library.favorites

  // If Not, then create the object so we can populate the list,
  // and as the object is being made, save the ID for it
});

router.post("/remove", function (req, res, next) {
});

/*
router.get("/songlist/:fid", function (req, res, next) {
  var fid = req.params.fid;

  if (fid == undefined) {
    res.status(400).json({
      songs: [],
    });
  } else {
    Forest.findOne({'_id': fid})
    .exec(function(err, songList) {
      if (err) throw err;


    })
  }
});
*/

//Populate the favorite songs
router.get("/:userid", function (req, res, next) {
  var userid = req.params.userid;

  if (userid == undefined) {
    res.status(400).json({
      songs: [],
    });
  } else {
    User.findOne({ _id: userid })
      .populate('songs')
      .exec(function (err, result) {
        if (err) throw err;
        console.log(forest);
        res.status(200).json({
          songs: result.library.favorites
        });
      });
  }
});

module.exports = router;

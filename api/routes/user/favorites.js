var express = require("express");
var mongoose = require('mongoose');
const models = require("../models");

var router = express.Router();

const User = models["user"];
const Song = models["song"];

/*
/user/favorites/songs
*/

// Turn a song into a favorite
router.post("/songs/add", function (req, res, next) {
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

router.post("/songs/remove", function (req, res, next) {
});

//Populate the favorite songs
router.get("/songs", function (req, res, next) {
  // replace with db request
});

module.exports = router;

var express = require("express");
var mongoose = require('mongoose');
const models = require("../models");

var router = express.Router();

const User = models["user"];

/*
/user/favorites/songs
*/

// Turn a song into a favorite
router.post("/add", function (req, res, next) {
  // Check that the strings are valid
  const userid = req.body.userid;
  const songlink = req.body.songlink;

  // If not then return with e
  if (songlink == undefined || userid == undefined) {
    console.log(songlink);
    console.log(userid);
    res.status(400).json({
      user: null,
    });
  } else {
    User.findOneAndUpdate({_id : userid}, { $push: {favorites: songlink} }, function (create_error, result) {
      if (create_error) throw create_error;
      console.log(result);
      res.status(200).json({
        user: result,
      });
    });
    
    res.status(200).json({});
  }
  // Check if song has an object already

  // If So, then just add that _id to user.library.favorites

  // If Not, then create the object so we can populate the list,
  // and as the object is being made, save the ID for it
});

//Populate the favorite songs
router.get("/songs", function (req, res, next) {
  // replace with db request
});

module.exports = router;

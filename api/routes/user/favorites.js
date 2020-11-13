var express = require('express');
const models  = require("../models");

var router = express.Router();

const User = models['user'];

/*
/user/favorites/songs
*/


// Turn a song into a favorite
router.post("/songs/add", function (req, res, next) {
  // Check that the strings are valid
  const userid = req.body.userid;
  const songlink = req.body.songlink;

  // If not then return with e
  if(songlink == undefined || userid == undefined){
    res.status(400).json({
      "user": null
    });
  } else {
    res.status(400).json({
      "user": null
    });
  }
    // Check if song has an object already
    

  // If So, then just add that _id to user.library.favorites

  // If Not, then create the object so we can populate the list,
  // and as the object is being made, save the ID for it


});


//Populate the favorite songs
router.get('/songs', function(req, res, next) {
  // replace with db request
  
});

module.exports = router;

var express = require('express');
var router = express.Router();

/*
/user/favorites/songs
*/


// Turn a song into a favorite
router.post("/songs/add", function (req, res, next) {
  // Check that the string for the song info is valid


  // If not then return with e
  
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

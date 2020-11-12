var express = require('express');
var router = express.Router();

/*
/user/favorites/songs
*/


// Turn a song into a favorite
router.post("/addsong", function (req, res, next) {
  // check that the string for the song info is valid

  // if not then return with e
  
  // Check if song has an object already

  // If So, then just add that _id to user.library.favorites

  // If Not, then create the object so we can populate the list,
  // and as the object is being made, save the ID for it


});


//Populate the favorite songs
router.get('/songs', function(req, res, next) {
 // replace with db request
  res.json({
    "songs": [
      {
        "id": 1,
        "song_name": "Piano Man",
        "artist_name": "Billy Joel",
        "album_art": "https://i.scdn.co/image/ab67616d00001e02814cbc4746358a25c84c62e7"
      },
      {
        "id": 2,
        "song_name": "Up Town Funk",
        "artist_name": "Bruno Mars",
        "album_art": "https://i.scdn.co/image/ab67616d00001e02814cbc4746358a25c84c62e7"
      }
    ]
  });
});

module.exports = router;

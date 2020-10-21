var express = require('express');
var router = express.Router();

/*
/user/favorites/songs
*/

router.get('/songs', function(req, res, next) {
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

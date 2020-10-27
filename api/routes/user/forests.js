var express = require('express');
var router = express.Router();

/*
/user/forests?userid=
/user/forests/saved?userid=
/user/forests/friends?userid=
*/

router.get('/', function(req, res, next) {
  res.json({
    "forests": [
      {
        "id": 1,
        "name": "My First Forest",
        "icon": "https://i.scdn.co/image/ab67616d00001e02814cbc4746358a25c84c62e7",
        "active": 1,
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
        ],
        "settings": {
          "privacy": 1
        }
      },
      {
        "id": 2,
        "name": "My Second Forest",
        "icon": "https://i.scdn.co/image/ab67616d00001e02814cbc4746358a25c84c62e7",
        "active": 1,
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
        ],
        "settings": {
          "privacy": 1
        }
      },
      {
        "id": 3,
        "name": "My Third Forest",
        "icon": "https://i.scdn.co/image/ab67616d00001e02814cbc4746358a25c84c62e7",
        "active": 1,
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
        ],
        "settings": {
          "privacy": 1
        }
      },
    ]
  });
});

router.get('/saved', function(req, res, next) {
  res.json({
    "forests": [
      {
        "id": 1,
        "name": "My First Forest",
        "icon": "https://i.scdn.co/image/ab67616d00001e02814cbc4746358a25c84c62e7",
        "active": 1,
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
        ],
        "settings": {
          "privacy": 1
        }
      },
      {
        "id": 2,
        "name": "My Second Forest",
        "icon": "https://i.scdn.co/image/ab67616d00001e02814cbc4746358a25c84c62e7",
        "active": 1,
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
        ],
        "settings": {
          "privacy": 1
        }
      },
      {
        "id": 3,
        "name": "My Third Forest",
        "icon": "https://i.scdn.co/image/ab67616d00001e02814cbc4746358a25c84c62e7",
        "active": 1,
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
        ],
        "settings": {
          "privacy": 1
        }
      },
    ]
  });
});

router.get('/friends', function(req, res, next) {
  res.json({
    "forests": [
      {
        "id": 1,
        "name": "My First Forest",
        "icon": "https://i.scdn.co/image/ab67616d00001e02814cbc4746358a25c84c62e7",
        "active": 1,
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
          },
          {
            "id": 3,
            "song_name": "San Francisco",
            "artist_name": "The Mowgli's",
            "album_art": "https://i.scdn.co/image/ab67616d00001e02814cbc4746358a25c84c62e7"
          }
        ],
        "settings": {
          "privacy": 1
        }
      },
      {
        "id": 2,
        "name": "My Second Forest",
        "icon": "https://i.scdn.co/image/ab67616d00001e02814cbc4746358a25c84c62e7",
        "active": 1,
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
        ],
        "settings": {
          "privacy": 1
        }
      },
      {
        "id": 3,
        "name": "My Third Forest",
        "icon": "https://i.scdn.co/image/ab67616d00001e02814cbc4746358a25c84c62e7",
        "active": 1,
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
          },
          {
            "id": 3,
            "song_name": "San Francisco",
            "artist_name": "The Mowgli's",
            "album_art": "https://i.scdn.co/image/ab67616d00001e02814cbc4746358a25c84c62e7"
          }
        ],
        "settings": {
          "privacy": 1
        }
      },
    ]
  });
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  res.json({
    "id": 1,
    "name": "My First Forest",
    "icon": "https://i.scdn.co/image/ab67616d00001e02814cbc4746358a25c84c62e7",
    "active": 1,
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
    ],
    "settings": {
      "privacy": 1
    }
  });
});

module.exports = router;

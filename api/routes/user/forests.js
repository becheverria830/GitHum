var express = require('express');

const models  = require("../models");

var router = express.Router();

const Forest = models['forests'];
const User = models['user'];

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

  if(name == undefined || userid == undefined){
    res.status(400).json({
      "forest": null
    });
  } else {
    var forest_data = {
      name: name,
      icon: "",
      active: true,
      children:[],
      depth: 1,
      creator: userid,
      songs: [],
      settings: {
        privacy: false
      }
    }
    Forest.insertMany([forest_data], function(create_error, result) {
      if (create_error) throw create_error;
      console.log(result);
      res.status(200).json({
        "forest": result[0]
      });
    });
  }
});

router.get('/forests/:userid', function(req, res, next) {
  console.log("inside here");
  //Getting the information from the request
  const userid = req.params.userid;

  if(userid == undefined){
    //Throwing an exception if user didn't supply all the information.
    res.status(400).json({
      "forests":[]
    });
  } else {
    //Finding if a user with the email exists already
    Forest.find({ 'creator': userid }, function (find_error, forests) {
      if (find_error) throw find_error;

      refined_forests = []
      for(forest of forests) {
        refined_forests.push(forest);
      }
      res.status(200).json({
        "forests": refined_forests
      });
    })
  }
});


router.get('/forests/:forestid', function(req, res, next) {
  
  var id = req.params.forestid;
  
  console.log("inside AAAAAA here");
  //Getting the information from the request
  const userid = req.params.userid;

  if(userid == undefined){
    //Throwing an exception if user didn't supply all the information.
    res.status(400).json({
      "forests":[]
    });
  } else {
    //Finding if a user with the email exists already
    Forest.find({'_id': id }, function (find_error, forests) {
      if (find_error) throw find_error;

      refined_forests = []
      for(forest of forests) {
        refined_forests.push(forest);
        console.log("WHERE AM IIIIIIIIIIIIIIIIIIIIIII");
      }
      res.status(200).json({
        "forests": refined_forests
      });
    })
  }








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


/*
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
  */
});

module.exports = router;

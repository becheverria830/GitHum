var express = require('express');
var SpotifyWebApi = require('spotify-web-api-node');

var keys = require('../config/keys');
var router = express.Router();

const models  = require("./models");
const Song = models["song"];

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: keys.Spotify_Client_ID,
  clientSecret: keys.Spotify_Client_Secret
});
spotifyApi.setAccessToken(keys.Spotify_OAuth_Token);

/*
/search?query=..
*/

router.get('/', function(req, res, next) {
  console.log(req.query.query);
  spotifyApi.searchTracks(req.query.query)
  .then(function(tracks) {
    refined_songs = []
    for(song of tracks.body.tracks.items) {
      var song_data = {
        name: song.name,
        artist_name: song.artists[0].name,
        album_art: song.album.images[0].url,
        spotify_uri: song.uri,
        genre_id: ""
      }
      refined_songs.push(song_data);
    }
    Song.insertMany(refined_songs, function(create_error, result) {
      if (create_error) throw create_error;
      console.log(result);
      res.status(200).json({
        "songs": result
      });
    });
  }, function(err) {
    console.error(err);
    res.status(400).json({
      "songs": []
    });
  });
});

module.exports = router;

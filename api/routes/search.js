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
  spotifyApi.searchTracks(req.query.query)
  .then(async function(tracks) {
    refined_songs = []
    for(song of tracks.body.tracks.items) {
      var song_data = {
        name: song.name,
        artist_name: song.artists[0].name,
        album_art: song.album.images[0].url,
        album_uri: song.album.uri,
        album_name: song.album.name,
        spotify_uri: song.uri,
        genre_id: "",
        release_date: song.album.release_date,
        popularity: song.popularity
      }
      let query = { spotify_uri: song.uri };
      let update = song_data;
      let options = {upsert: true, new: true, setDefaultsOnInsert: true};
      let result = await Song.findOneAndUpdate(query, update, options);
      refined_songs.push(result);
    }
    res.status(200).json({
      "songs": refined_songs
    });
  }, function(err) {
    console.error(err);
    res.status(400).json({
      "songs": []
    });
  });
});

module.exports = router;

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

function intervalFunc() {
  // Retrieve an access token.
  spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );
}
  setInterval(intervalFunc, 2700000);
  intervalFunc();

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

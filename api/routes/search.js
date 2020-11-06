var express = require('express');
var SpotifyWebApi = require('spotify-web-api-node');

var keys = require('../config/keys');
var router = express.Router();

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
      refined_song = {
        "id": song.id,
        "song_name": song.name,
        "artist_name": song.artists[0].name,
        "album_art": song.album.images[0].url,
        "uri": song.uri,
        "href": song.href
      }
      refined_songs.push(refined_song);
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

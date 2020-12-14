var express = require("express");
var router = express.Router();

const models = require("./models");
const Song = models["song"];

router.get("/:songid", function (req, res, next) {
    const songid = req.params.songid;

    Song.findOne({ _id: songid })
        .exec(function (err, song) {
        if (err) throw err;
        console.log(song);
        res.status(200).json(song);
        });
 });

 router.post("/manySongs", function (req, res, next) {
    var songids = req.body.songids;

    if(songids == undefined || songids == null){
        res.status(400).json({songs: []});
    }
    Song.find({
        '_id': { $in: songids }
    }, function(err, songs){
        res.status(200).json(songs);
    });
    
 });

/* 
    name: String,
    artist_name: String,
    album_art: String,
    spotify_uri: String,
    genre_id: String,
    release_date: String,
    popularity: Number,
*/

module.exports = router;
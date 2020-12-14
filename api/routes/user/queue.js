var express = require('express');
var router = express.Router();
const models  = require("../models");

const Queue = models["queue"];
const Forest = models["forests"];
const Song = models["song"];

/*
Different Queue Operations:
// Get User's Queue
// Skip Song --> increment the index
// Previous Song --> decrement the index
// Add Song to Queue --> insert song after the current
// Play Forest's songs, given a starting position in the forest --> delete all elements from queue, add all forest's songs, set index = position
// Play Certain Song --> delete all elements from queue, add certain song, set index = 0
// Shuffle --> Randomizes the list of songs, setting index = 0
*/

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

router.get('/:userid', function(req, res, next) {
  const userid = req.params.userid;

  Queue.findOne({ user_id: userid })
    .populate('song_list')
    .populate('current_forest_id')
    .exec(function (err, queue) {
      if (err) throw err;
      res.status(200).json({
        queue: queue
      });
    });
});

router.post('/skip', function(req, res, next) {
  const userid = req.body.userid;

  Queue.findOne({ user_id: userid })
    .populate('song_list')
    .populate('current_forest_id')
    .exec(function (err, queue) {
      if (err) throw err;

      if (queue.song_list.length == 0) {
        queue.index = -1;
      } else {
        queue.index += 1;
        if (queue.index >= queue.song_list.length) {
          queue.index = 0;
        }
      }
      Queue.updateOne({ 'user_id': userid }, { 'index': queue.index, 'position': 0 }, function(err, updated_queue) {
        if (err) throw err;

        Queue.findOne({ user_id: userid })
          .populate('song_list')
          .populate('current_forest_id')
          .exec(function (err, queue) {
            if (err) throw err;
            res.status(200).json({
              queue: queue
            });
          });
      });
    });
});

router.post('/rewind', function(req, res, next) {
  const userid = req.body.userid;

  Queue.findOne({ user_id: userid })
    .populate('song_list')
    .populate('current_forest_id')
    .exec(function (err, queue) {
      if (err) throw err;

      if (queue.song_list.length == 0) {
        queue.index = -1;
      } else {
        queue.index -= 1;
        if (queue.index < 0) {
          queue.index = queue.song_list.length - 1;
        }
      }
      Queue.updateOne({ 'user_id': userid }, { 'index': queue.index, 'position': 0 }, function(err, updated_queue) {
        if (err) throw err;

        Queue.findOne({ user_id: userid })
          .populate('song_list')
          .populate('current_forest_id')
          .exec(function (err, queue) {
            if (err) throw err;
            res.status(200).json({
              queue: queue
            });
          });
      });
    });
});

router.post('/add_song', function(req, res, next) {
  const userid = req.body.userid;
  const songid = req.body.songid;

  Queue.findOne({ user_id: userid })
    .exec(function (err, queue) {
      if (err) throw err;

      if (queue.song_list.length == 0) {
        queue.index = 0;
        queue.song_list.push(songid);
      } else {
        queue.song_list.push(songid);
        // queue.song_list.splice(queue.index + 1, 0, songid);
      }
      Queue.updateOne({ 'user_id': userid }, { 'index': queue.index, 'song_list': queue.song_list }, function(err, updated_queue) {
        if (err) throw err;

        Queue.findOne({ user_id: userid })
          .populate('song_list')
          .populate('current_forest_id')
          .exec(function (err, queue) {
            if (err) throw err;
            res.status(200).json({
              queue: queue
            });
          });
      });
    });
});

router.post('/remove_song', function(req, res, next) {
  const userid = req.body.userid;
  const index = req.body.queue_index;

  Queue.findOne({ user_id: userid })
    .exec(function (err, queue) {
      if (err) throw err;

      var song_list = queue.song_list;
      song_list.pop(index);

      var index = -1;
      var playing = 0;
      var position = 0;

      if(song_list.length != 0) {
        playing = queue.playing;
        index = queue.index;
        if(index < queue.index) {
          index = index - 1;
        } else {
          position = queue.position;
        }
        if (index >= song_list.length || index < 0) {
          queue.index = 0;
        }
      }


      Queue.updateOne({ 'user_id': userid }, { 'song_list': song_list, 'index': index, 'position': position, 'playing': playing }, function(err, updated_queue) {
        if (err) throw err;

        Queue.findOne({ user_id: userid })
          .populate('song_list')
          .populate('current_forest_id')
          .exec(function (err, queue_return) {
            if (err) throw err;
            res.status(200).json({
              queue: queue_return
            });
          });
      });
    });
});

router.post('/clear', function(req, res, next) {
  const userid = req.body.userid;

  Queue.findOne({ user_id: userid })
    .exec(function (err, queue) {
      if (err) throw err;
      Queue.updateOne({ 'user_id': userid }, { 'song_list': [], 'index': -1, 'position': 0, 'playing': 0 }, function(err, updated_queue) {
        if (err) throw err;

        Queue.findOne({ user_id: userid })
          .populate('song_list')
          .populate('current_forest_id')
          .exec(function (err, queue_return) {
            if (err) throw err;
            console.log(queue_return);
            res.status(200).json({
              queue: queue_return
            });
          });
      });
    });
});

router.post('/play_forest', function(req, res, next) {
  const userid = req.body.userid;
  const forestid = req.body.forestid;

  Queue.findOne({ user_id: userid })
    .exec(function (err, queue) {
      if (err) throw err;

      Forest.findOne({ _id: forestid })
        .exec(function (err, forest) {
          if (err) throw err;

          queue.song_list = forest.songs;
          if (queue.song_list.length == 0) {
            queue.index = -1;
          } else {
            queue.index = 0;
          }

          Queue.updateOne({ 'user_id': userid }, { 'index': queue.index, 'song_list': queue.song_list, 'current_forest_id': forestid, 'position': 0 }, function(err, updated_queue) {
            if (err) throw err;

            Queue.findOne({ user_id: userid })
              .populate('song_list')
              .populate('current_forest_id')
              .exec(function (err, queue) {
                if (err) throw err;
                res.status(200).json({
                  queue: queue
                });
              });
          });
        });
    });
});

router.post('/play_song', function(req, res, next) {
  const userid = req.body.userid;
  const songid = req.body.songid;

  Queue.findOne({ user_id: userid })
    .exec(function (err, queue) {
      if (err) throw err;

      Song.findOne({ _id: songid })
        .exec(function (err, forest) {
          if (err) throw err;

          queue.song_list = [songid];

          Queue.updateOne({ 'user_id': userid }, { 'index': 0, 'song_list': queue.song_list, 'current_forest_id': null, 'position': 0 }, function(err, updated_queue) {
            if (err) throw err;

            Queue.findOne({ user_id: userid })
              .populate('song_list')
              .populate('current_forest_id')
              .exec(function (err, queue) {
                if (err) throw err;
                res.status(200).json({
                  queue: queue
                });
              });
          });
        });
    });
});

router.post('/shuffle', function(req, res, next) {
  const userid = req.body.userid;

  Queue.findOne({ user_id: userid })
    .exec(function (err, queue) {
      if (err) throw err;

      if(queue.song_list.length != 0) {
        shuffle(queue.song_list);
        queue.index = 0;
      }

      Queue.updateOne({ 'user_id': userid }, { 'index': queue.index, 'song_list': queue.song_list, 'position': 0 }, function(err, updated_queue) {
        if (err) throw err;

        Queue.findOne({ user_id: userid })
          .populate('song_list')
          .populate('current_forest_id')
          .exec(function (err, queue) {
            if (err) throw err;
            res.status(200).json({
              queue: queue
            });
          });
      });
    });
});

router.post('/update_position', function(req, res, next) {
  const userid = req.body.userid;
  const position = req.body.position;
  Queue.updateOne({ 'user_id': userid }, { 'position': position }, function(err, updated_queue) {
    if (err) throw err;
    res.status(200).send("");
  });
});

router.post('/set_is_playing', function(req, res, next) {
  const userid = req.body.userid;
  const playing = req.body.playing;
  Queue.updateOne({ 'user_id': userid }, { 'playing': playing }, function(err, updated_queue) {
    if (err) throw err;
    res.status(200).send("");
  });
});

module.exports = router;

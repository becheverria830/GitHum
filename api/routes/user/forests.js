var express = require("express");
var mongoose = require("mongoose");
const models = require("../models");

var router = express.Router();

const Forest = models["forests"];
const Hierarchy = models["hierarchy"];
const User = models["user"];

/*
/user/forests?userid=
/user/forests/saved?userid=
/user/forests/friends?userid=
*/

function filterRoot(parent) {
  var color;
  if(parent.active == 0) {
    color = 'red';
  } else if(parent.settings.privacy == 0) {
    color = 'green';
  } else {
    color = 'grey';
  }
  var refinedParent = {
    name: parent.name,
    forest_id: parent.id,
    active: parent.active == 1 && parent.settings.privacy == 0,
    children: [],
    nodeSvgShape: {
      shape: 'circle',
      shapeProps: {
        r: 10,
        fill: color,
        stroke: 'black',
        opacity: 1,
      },
    },
    attributes: {
      creator: parent.creator.first_name + " " + parent.creator.last_name,
    },
  };
  for (var childIndex in parent.children) {
    refinedParent.children.push(filterRoot(parent.children[childIndex]));
  }
  return refinedParent;
}

router.post("/create", (req, res, err) => {
  const name = req.body.name;
  const userid = req.body.userid;
  const icon = req.body.icon;
  console.log(name);
  console.log(userid);

  if (name == undefined || userid == undefined) {
    res.status(400).json({
      forest: null,
    });
  } else {
    var forest_data = {
      name: name,
      icon: icon,
      active: true,
      children: [],
      depth: 1,
      creator: userid,
      songs: [],
      settings: {
        privacy: false,
      },
      times_saved: 0,
    };
    Forest.insertMany([forest_data], function (create_error, result) {
      if (create_error) throw create_error;
      console.log(result);
      res.status(200).json({
        forest: result[0],
      });
    });
  }
});

router.post("/byId/:fid/add", function (req, res, next) {
  const fid = req.body.forestid;
  const sid = req.body.userid;
  console.log(fid);
  console.log(sid);

  if (fid == undefined || sid == undefined) {
    res.status(400).json({
      forest: null,
    });
  } else {
    Forest.findOneAndUpdate({ _id: uid }, { $push: { songs: sid } }, function (
      err,
      result
    ) {
      if (err) throw err;
      res.status(200).json({});
    });
  }
});

router.post("/save", function (req, res, next) {
  const fid = req.body.forest_id;
  const fcreator = req.body.forest_creator_id; //FIX LATER
  const uid = req.body.user_id;

  if (fid == undefined || uid == undefined) {
    res.status(400).json({
      forest: null,
    });
  } else if (fcreator == uid) {
    res.status(400).json({
      forest: null,
    });
  } else {
    // Add to user's saved forests
    User.findOneAndUpdate(
      { _id: uid },
      { $push: { "library.saved_forests": fid } },
      function (err, result) {
        if (err) {
          throw err;
        } else {
          // Times Saved + 1
          Forest.findOneAndUpdate(
            { _id: fid },
            { $inc: { times_saved: 1 } },
            { new: true },
            function (err, res_updated_times_saved) {
              if (err) {
                throw err;
              } else {
                res.status(200).json({});
              }
            }
          );
        }
      }
    );
  }
});

router.post("/unsave", function (req, res, next) {
  const fid = req.body.forest_id;
  // const fcreator = req.body.forest_creator_id; //FIX LATER
  const uid = req.body.user_id;
  console.log(fid);
  console.log(uid);

  if (fid == undefined || uid == undefined) {
    res.status(400).json({
      forest: null,
    });
  } else {
    User.findOne({ _id: uid })
    .exec(function (err, user) {
    if (err) throw err;
    console.log(user);

    // Remove forest from saved forest list
    var saved_forests = user.library.saved_forests;
    var index = saved_forests.indexOf(fid);
    saved_forests.splice(index, 1);

    // Updated saved forests
    User.findOneAndUpdate(
      { _id: uid },
      { $set: {'library.saved_forests': saved_forests}},
      function (err, result) {
        if (err) {
          throw err;
        } else {
          // Times Saved + 1
          Forest.findOneAndUpdate(
            { _id: fid },
            { $inc: { times_saved: -1 } },
            { new: true },
            function (err, res_updated_times_saved) {
              if (err) {
                throw err;
              } else {
                res.status(200).json({});
              }
            }
          );
        }
      }
    );

    });
  }
});

router.post("/addToForest", function (req, res, next) {
  // WORKS!
  const song_id = req.body.song_id;
  const forest_id = req.body.forest_id;

  Forest.findOne({ _id: forest_id }, function (err, res_find_forest) {
    if (err) {
      console.log(err);
    } else {
      res_find_forest.songs.push(song_id);
      Forest.update(
        { _id: forest_id },
        { songs: res_find_forest.songs },
        function (err, res_update_forest) {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({});
          }
        }
      );
    }
  });
});

router.post("/removeFromForest", function (req, res, next) {
  const song_id = req.body.song_id;
  const forest_id = req.body.forest_id;

  Forest.findOne({ _id: forest_id }, function (err, res_find_forest) {
    if (err) {
      console.log("didnt find forest");
      console.log(err);
    } else {
      console.log(res_find_forest.songs);
      const index = res_find_forest.songs.indexOf(song_id);
      console.log(index);
      res_find_forest.songs.splice(index,1);
      Forest.update(
        { _id: forest_id },
        { songs: res_find_forest.songs },
        function (err, res_update_forest) {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({});
          }
        }
      );
    }
  });
});


router.post("/branchForest", function (req, res, next) {
  const branch_forest_name = req.body.branch_forest_name;
  const parent_forest_id = req.body.parent_forest_id;
  const user_id = req.body.user_id;

  // Get Parent Forest
  if (parent_forest_id == undefined) {
    res.status(400).json({
      forest: null,
    });
  } else {
    Forest.findOne({ _id: parent_forest_id }, function (err, res_find_parent) {
      var parent_forest_songs = res_find_parent.songs;
      var branch_depth = res_find_parent.depth + 1;
      var branch_forest_data = {
        name: branch_forest_name,
        icon: "/static/media/forest.ff62ca20.svg",
        active: true,
        children: [],
        depth: branch_depth,
        creator: user_id,
        parent: parent_forest_id,
        songs: parent_forest_songs,
        settings: {
          privacy: false,
        },
        times_saved: 0,
      };
      //
      // Create Branch Forest (Forest.insertMany)
      Forest.insertMany([branch_forest_data], function (
        create_error,
        res_insert_forest
      ) {
        if (create_error) {
          throw create_error;
        } else {
          //
          // Update Parent.children
          res_find_parent.children.push(res_insert_forest[0]._id);
          Forest.update(
            { _id: parent_forest_id },
            {
              children: res_find_parent.children,
            },
            function (err, res_update_children) {
              if (create_error) throw create_error;
              console.log(res_insert_forest);
              res.status(200).json({
                forest: res_insert_forest[0],
              });
            }
          );
        }
      });
    });
  }

  //
});

router.post("/update_information", function (req, res, next) {
  const fid = req.body.forest_id;
  const pri = req.body.privacy;
  const name = req.body.name;

  if (fid == undefined || pri == undefined) {
    res.status(400).json({
      fid: -1
    });
  }
  else {
    Forest.findOneAndUpdate(
      { _id: fid },
      {$set: {'settings.privacy': pri, 'name': name}},
      function (err, result) {
        if (err) {
          console.log(err);
          throw err;
        }
        else {
          res.status(200).json({});
        }
      }
    )
  }
});

router.post("/update_icon", function (req, res, next) {
  const fid = req.body.forest_id;
  const icon = req.body.base_icon;

  if (fid == undefined) {
    res.status(400).json({
      fid: -1
    });
  }
  else {
    Forest.findOneAndUpdate(
      { _id: fid },
      {$set: {'icon': icon}},
      function (err, result) {
        if (err) {
          console.log(err);
          throw err;
        }
        else {
          res.status(200).json({});
        }
      }
    )
  }
});

router.post("/deforest", function (req, res, next) {
  const fid = req.body.fid;
  console.log(fid);
  //const fname = req.body.name;
  //const user_id = req.body.user_id;

  if (fid == undefined) {
    res.status(400).json({
      fid: -1
    });
  }
  else {
    Forest.findOneAndUpdate(
      { _id: fid },
      {$set: {'active': '0'}},
      function (err, result) {
        if (err) {
          console.log(err);
          throw err;
        }
        else {
          res.status(200).json({});
        }
      }
    )
  }
});

router.get("/forests/:userid", function (req, res, next) {
  //Getting the information from the request
  const userid = req.params.userid;

  if (userid == undefined) {
    //Throwing an exception if user didn't supply all the information.
    res.status(400).json({
      forests: [],
    });
  } else {
    //Finding if a user with the email exists already
    Forest.find({ creator: userid, active: 1}, function (find_error, forests) {
      if (find_error) throw find_error;

      refined_forests = [];
      for (forest of forests) {
        refined_forests.push(forest);
      }
      res.status(200).json({
        forests: refined_forests,
      });
    });
  }
});

/* Can add maxDepth to graphLookup to limit our search based on the users plan */
router.get("/:forestid/hierarchy", function (req, res, next) {
  var id = req.params.forestid;

  if (id == undefined) {
    //Throwing an exception if user didn't supply all the information.
    res.status(400).json({
      hierarchy: {},
    });
  } else {
    //Getting the root node
    Forest.findOne({ _id: mongoose.Types.ObjectId(id) })
      .populate("creator")
      .exec(function (err, results) {
        if (err) throw err;
        if (results.depth == 1) {
          Hierarchy.findOne({ _id: id }, function (error, parent) {
            res.status(200).json({
              hierarchy: filterRoot(parent),
            });
          });
        } else {
          Forest.aggregate(
            [
              {
                $match: {
                  _id: mongoose.Types.ObjectId(id),
                },
              },
              {
                $graphLookup: {
                  from: "Forests",
                  startWith: "$parent",
                  connectFromField: "parent",
                  connectToField: "_id",
                  as: "root",
                },
              },
            ],
            function (err, results) {
              if (err) throw err;
              //Finding the parent node in the list of results
              var parent = null;
              for (var i in results[0].root) {
                if (results[0].root[i].depth == 1) {
                  parent = results[0].root[i];
                }
              }

              Hierarchy.findOne({ _id: parent._id }, function (error, parent) {
                res.status(200).json({
                  hierarchy: filterRoot(parent),
                });
              });
            }
          );
        }
      });
  }
});

router.get("/:forestid", function (req, res, next) {
  var id = req.params.forestid;

  if (id == undefined) {
    //Throwing an exception if user didn't supply all the information.
    res.status(400).json({
      forests: [],
    });
  } else {
    Forest.findOne({ _id: id })
      .populate("songs")
      .exec(function (err, forest) {
        if (err) throw err;
        console.log(forest);
        res.status(200).json({
          forests: forest,
        });
      });
  }
});

router.get("/saved/:userid", function (req, res, next) {
  var userid = req.params.userid;

  if (userid == undefined) {
    //Throwing an exception if user didn't supply all the information.
    res.status(400).json({
      forests: [],
    });
  } else {
    //Finding if a user with the email exists already
    User.findOne({ _id: userid })
      .populate("library.saved_forests")
      .exec(function (err, user) {
        if (err) throw err;
        res.status(200).json({
          forests: user.library.saved_forests,
        });
      });
  }
});

router.get("/friends/:userid", function (req, res, next) {
  //Get all the friends of the user
  const userid = req.params.userid;

  if (userid == undefined) {
    res.status(200).json({
      forests: [],
    });
  } else {
    User.find({ _id: userid }, function (find_error, users) {
      if (find_error) throw find_error;
      //Checking if the user existed, if not creating an entry for them.
      if (users.length == 0) {
        res.status(200).json({
          forests: [],
        });
      } else {
        //Getting all the friends for the current user
        updated_friends_list = users[0].friend.list.map((friend) =>
          mongoose.Types.ObjectId(friend)
        );
        Forest.aggregate(
          [
            {
              $match: {
                creator: { $in: updated_friends_list },
              },
            },
            {
              $lookup: {
                from: "Users",
                localField: "creator",
                foreignField: "_id",
                as: "creator",
              },
            },
            {
              $project: {
                "creator.friend": 0,
                "creator.library": 0,
                "creator.credentials": 0,
                "creator.icon": 0,
              },
            },
          ],
          function (err, forests) {
            // Remove Forests with No Songs
              var final_forest_list = forests;
              var splice_indices = [];
              final_forest_list.forEach(function(forest, index) {
                if(forest.songs === null || forest.songs.length === 0 ){
                  splice_indices.push(index);
                }
              });
              for (var i = splice_indices.length -1; i >= 0; i--)
              final_forest_list.splice(splice_indices[i],1);

            // If # of Forests > n, get n random forests 
              var n = 50;
              if(final_forest_list.length > n){
                var sampled_forests = [];
                var non_selected_indices = Array(final_forest_list.length).fill().map((_, idx) => idx);
                var selected_indices = [];
                for(var i = 0; i < n; i++){
                  var index = non_selected_indices[Math.floor(Math.random() * non_selected_indices.length)];
                  non_selected_indices.splice(non_selected_indices.indexOf(index), 1);
                  selected_indices.push(index);
                }

                for(var i = 0; i < selected_indices.length; i++){
                  sampled_forests.push(final_forest_list[selected_indices[i]]);
                }
                final_forest_list = sampled_forests;
              }  

            // Shuffle the forests
              for (var i = final_forest_list.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = final_forest_list[i];
                final_forest_list[i] = final_forest_list[j];
                final_forest_list[j] = temp;
               }

            // Return forests
            res.status(200).json({ forests: final_forest_list });
          }
        );
      }
    });
  }
});

module.exports = router;

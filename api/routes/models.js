const { introspectSchema } = require("apollo-server");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema(
  {
    username: String,
    first_name: String,
    last_name: String,
    credentials: {
      email: String,
      password: String,
    },
    icon: String,
    friend: {
      list: [{ type: mongoose.ObjectId, ref: "users" }],
      incoming_requests: [{ type: mongoose.ObjectId, ref: "users" }],
      outgoing_requests: [{ type: mongoose.ObjectId, ref: "users" }],
    },
    library: {
      favorites: [{ type: mongoose.ObjectId, ref: "song" }],
      my_forests: [{ type: mongoose.ObjectId, ref: "forests" }],
      saved_forests: [{ type: mongoose.ObjectId, ref: "forests" }],
    },
  },
  { collection: "Users" }
);

user = mongoose.model("users", user);

let resetpassword = new Schema(
  {
    user_id: { type: mongoose.ObjectId, ref: "users" },
    hashed_token: String,
    request_time: Date,
    expiration_time: Date,
    reset_time: Date,
  },
  { collection: "ResetPassword" }
);

resetpassword = mongoose.model("resetpassword", resetpassword);

let queue = new Schema(
  {
    user_id: { type: mongoose.ObjectId, ref: "users" },
    current_forest_id: { type: mongoose.ObjectId, ref: "forests" },
    song_list: [{ type: mongoose.ObjectId, ref: "song" }],
    index: Number,
  },
  { collection: "Queue" }
);

queue = mongoose.model("queue", queue);

let forests = new Schema(
  {
    name: String,
    icon: String,
    active: Number,
    parent: { type: mongoose.ObjectId, ref: "forests" },
    children: [{ type: mongoose.ObjectId, ref: "forests" }],
    depth: Number,
    creator: { type: mongoose.ObjectId, ref: "users" },
    songs: [{ type: mongoose.ObjectId, ref: "song" }],
    settings: {
      privacy: Number,
    },
    times_saved: Number,
  },
  { collection: "Forests" }
);

forests = mongoose.model("forests", forests);

let message = new Schema(
  {
    from_user: { type: mongoose.ObjectId, ref: "users" },
    to_user: { type: mongoose.ObjectId, ref: "users" },
    timestamp: Date,
    content: String,
  },
  { collection: "Message" }
);

message = mongoose.model("message", message);

let song = new Schema(
  {
    name: String,
    artist_name: String,
    album_art: String,
    spotify_uri: String,
    genre_id: String,
  },
  { collection: "Song" }
);

song = mongoose.model("song", song);

const models = {
  user: user,
  resetpassword: resetpassword,
  queue: queue,
  forests: forests,
  message: message,
  song: song,
};

module.exports = models;

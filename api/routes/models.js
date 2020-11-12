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
      password: String
    },
    icon: String,
    friend: {
      list: [mongoose.ObjectId],
      incoming_requests: [mongoose.ObjectId],
      outgoing_requests: [mongoose.ObjectId]
    },
    library: {
      favorites: [mongoose.ObjectId],
      my_forests: [mongoose.ObjectId],
      saved_forests: [mongoose.ObjectId]
    }
  },
  { collection: "Users" }
);

user = mongoose.model("users", user);

let resetpassword = new Schema(
  {
    user_id: mongoose.ObjectId,
    hashed_token: String,
    request_time: Date,
    expiration_time: Date,
    reset_time: Date
  },
  { collection: "ResetPassword" }
);

resetpassword = mongoose.model("resetpassword", resetpassword);

let queue = new Schema(
  {
    user_id: mongoose.ObjectId,
    current_forest_id: mongoose.ObjectId,
    song_list: [mongoose.ObjectId],
    index: Number
  },
  { collection: "Queue" }
)

queue = mongoose.model("queue", queue);

let forests = new Schema(
  {
    name: String,
    icon: String,
    active: Number,
    parent: mongoose.ObjectId,
    children: [mongoose.ObjectId],
    depth: Number,
    creator: mongoose.ObjectId,
    songs: [mongoose.ObjectId],
    settings: {
      privacy: Number
    }
  },
  { collection: "Forests" }
)

forests = mongoose.model("forests", forests);

const models = {
  'user': user,
  'resetpassword': resetpassword,
  'queue': queue,
  'forests': forests
};

module.exports = models;

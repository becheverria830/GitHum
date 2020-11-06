var createError  = require("http-errors");
var express      = require("express");
var path         = require("path");
var cookieParser = require("cookie-parser");
var logger       = require("morgan");
var cors         = require("cors");
var passport     = require("passport");

var searchRouter      = require("./routes/search");
var friendsRouter     = require("./routes/user/friends");
var forestsRouter     = require("./routes/user/forests");
var favoritesRouter   = require("./routes/user/favorites");
var queueRouter       = require("./routes/user/queue");
var credentialsRouter = require("./routes/user/credentials");

const db   = require("./routes/database");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/search", searchRouter);
app.use("/user/friends", friendsRouter);
app.use("/user/forests", forestsRouter);
app.use("/user/favorites", favoritesRouter);
app.use("/user/queue", queueRouter);
app.use("/user/credentials", credentialsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log("Here");
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).send("error");
});

module.exports = app;

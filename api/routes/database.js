const mongoose = require("mongoose");
const keys = require('../config/keys.js');

mongoose.connect(keys.MongoDB_URI, keys.MongoDB_Options);

// If there is a connection error send an error message
mongoose.connection.on("error", error => {
    console.log("Database connection error:", error);
});

// If connected to MongoDB send a success message
mongoose.connection.once("open", () => {
    console.log("Connected to Database!");
});

module.exports = mongoose.connection;

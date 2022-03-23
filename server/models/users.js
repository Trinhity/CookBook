const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userid: "string",
  username: "string",
  password: "string",
  profilepic: "string",
  last_login: Date.now(),
});

module.exports = mongoose.model("users", userSchema);

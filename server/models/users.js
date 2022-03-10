const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  uid: "string",
  uname: "string",
  upassword: "string",
  uprofile: "string",
});

module.exports = mongoose.model("users", userSchema);

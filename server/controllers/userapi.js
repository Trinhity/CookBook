const bcrypt = require("bcryptjs");
const CookBookUsers = require("../models/users");
const fs = require("fs");

module.exports = class API {
  static async createUser(req, res) {
    const user = "";
    const plainPassword = req.body.password;

    try {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(plainPassword, salt, function (err, hash) {
          user.username = req.body.username;
          user.password = hash;
          const created = CookBookUsers.create(user);
        });
      });

      res.status(200).json({
        Message: "User created",
      });
    } catch (err) {
      res.status(400).json({
        Error: err.message,
      });
    }
  }

  static async authenticateUser(req, res) {
    const username = req.body.params.username;
    const plainPassword = req.body.params.password;

    try {
      const user = await CookBookUsers.find({ username: username }).then(
        (data) => {
          bcrypt.compare(plainPassword, data.password).then((result) => {
            if (result) {
              res.status(200).json({
                response: "Successful login",
              });
            } else {
              res.status(405).json({
                response: "Incorrect username or password",
              });
            }
          });
        }
      );
    } catch (err) {
      res.status(400).json({
        response: "Unsuccessful login",
      });
    }
  }
};

const CookBookUsers = require("../models/users");
const fs = require("fs");

module.exports = class UserAPI {
  static async registerNewUser(req, res) {
    try {
      // console.log(isUser);
      // if (isUser.length >= 1) {
      //   return res.status(409).json({
      //     message: "email already in use",
      //   });
      // }
      const user = new CookBookUsers({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      });
      let data = await user.save();
      const token = await user.generateAuthToken();
      res.status(201).json({ data, token });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  }

  static async loginUser(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await CookBookUsers.findByCredentials(email, password);
      if (!user) {
        return res
          .status(401)
          .json({ err: "Login failed! Check authentication credentials" });
      }
      const token = await user.generateAuthToken();
      res.status(201).json({ user, token });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  }

  static async getUserDetails(req, res) {
    await res.json(req.userData);
  }
};

const CookBookUsers = require("../models/users");
const fs = require("fs");

module.exports = class UserAPI {
  static async registerNewUser(req, res) {
    try {
      console.log(isUser);
      if (isUser.length >= 1) {
        return res.status(409).json({
          message: "email already in use",
        });
      }
      const user = new CookBookUsers({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      let data = await user.save();
      const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
      res.status(201).json({ data, token });
    } catch (err) {
      res.status(400).json({ err: err });
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
          .json({ error: "Login failed! Check authentication credentials" });
      }
      const token = await user.generateAuthToken();
      res.status(201).json({ user, token });
    } catch (err) {
      res.status(400).json({ err: err });
    }
  }

  static async getUserDetails(req, res) {
    await res.json(req.userData);
  }
};

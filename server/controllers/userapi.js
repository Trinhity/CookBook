const CookBookUsers = require("../models/users");
const fs = require("fs");

module.exports = class UserAPI {
  static async createUser(req, res) {
    const user = req.body;
    try {
      await CookBookUsers.create(user);
      res.status(200).json({
        Message: "User created",
      });
    } catch (err) {
      res.status(400).json({
        Error: err.message,
      });
    }
  }

  static async getSavedRecipesByID(req, res) {
    const id = req.params.id;
    try {
      const recipe = await CookBookRecipes.findById(id);
      res.status(200).json(recipe);
    } catch (err) {
      res.status(404).json({
        Error: err.message,
      });
    }
  }

  static async deleteSavedRecipesByID(req, res) {
    const id = req.params.id;
    try {
      const result = await CookBookRecipes.findByIdAndDelete(id);
      if (result.image != "") {
        try {
          fs.unlinkSync("./uploads/" + result.image);
        } catch (err) {
          console.log(err);
        }
      }
      res.status(200).json({
        Message: "Recipe deleted",
      });
    } catch (err) {
      res.status(404).json({
        Error: err.message,
      });
    }
  }
};

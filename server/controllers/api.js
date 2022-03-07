const CookBook = require("../models/recipes");
const fs = require("fs");

module.exports = class API {
  static async saveRecipe(req, res) {
    const recipe = req.body;
    const imagename = req.file.filename;
    recipe.image = imagename;
    try {
      await CookBook.create(recipe);
      res.status(200).json({
        Message: "Recipe saved",
      });
    } catch (err) {
      res.status(400).json({
        Error: err.message,
      });
    }
  }

  static async getSavedRecipes(req, res) {
    try {
      const recipes = await CookBook.find();
      res.status(200).json(recipes);
    } catch (err) {
      res.status(404).json({
        Error: err.message,
      });
    }
  }

  static async getSavedRecipesByID(req, res) {
    const id = req.params.id;
    try {
      const recipe = await CookBook.findById(id);
      res.status(200).json(recipe);
    } catch (err) {
      res.status(404).json({
        Error: err.message,
      });
    }
  }

  static async deleteSavedRecipes(req, res) {
    res.send("TEST DELETE SAVED");
  }

  static async deleteSavedRecipesByID(req, res) {
    const id = req.params.id;
    try {
      const result = await CookBook.findByIdAndDelete(id);
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

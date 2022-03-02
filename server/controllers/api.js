const CookBook = require("../models/recipes");

module.exports = class API {
  static async saveRecipe(req, res) {
    const recipe = req.body;
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
    res.send("TEST GET SAVED BY ID");
  }

  static async deleteSavedRecipes(req, res) {
    res.send("TEST DELETE SAVED");
  }

  static async deleteSavedRecipesByID(req, res) {
    res.send("TEST DELETE SAVED BY ID");
  }
};

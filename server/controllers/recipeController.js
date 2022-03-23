const CookBookRecipes = require("../models/recipes");
const fs = require("fs");

module.exports = class API {
  static async saveRecipe(req, res) {
    try {
      await CookBookRecipes.create({
        recipe: {
          uri: req.body.uri,
          label: req.body.label,
          image: req.body.image,
          source: req.body.source,
          url: req.body.url,
          yield: req.body.yield,
          dietLabels: req.body.dietLabels,
          healthLabels: req.body.healthLabels,
          cautions: req.body.cautions,
          ingredients: req.body.ingredients,
          calories: req.body.calories,
          totalTime: req.body.totalTime,
          cuisineType: req.body.cuisineType,
          mealType: req.body.mealType,
          dishType: req.body.dishType,
        },
      });

      res.status(201).json({
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
      const recipes = await CookBookRecipes.find();
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
      const recipe = await CookBookRecipes.findById(id);
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
      const result = await CookBookRecipes.findByIdAndDelete(id);
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

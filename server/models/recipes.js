const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  uri: "string",
  label: "string",
  image: "string",
  source: "string",
  url: "string",
  shareAs: "string",
  yield: 0,
  dietLabels: ["string"],
  healthLabels: ["string"],
  cautions: ["string"],
  ingredients: [
    {
      text: "string",
      quantity: 0,
      measure: "string",
      food: "string",
      weight: 0,
      foodId: "string",
    },
  ],
  calories: 0,
  cuisineType: ["string"],
  mealType: ["string"],
  dishType: ["string"],
});

module.exports = mongoose.model("recipes", recipeSchema);

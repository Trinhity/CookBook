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
  glycemicIndex: 0,
  totalCO2Emissions: 0,
  co2EmissionsClass: "string",
  totalWeight: 0,
  cuisineType: ["string"],
  mealType: ["string"],
  dishType: ["string"],
  totalNutrients: {},
  totalDaily: {},
});

module.exports = mongoose.model("Cookbook", recipeSchema);

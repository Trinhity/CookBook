const express = require("express");
const router = express.Router();
const API = require("../controllers/api");

router.get("/", API.getSavedRecipes);
router.get("/:id", API.getSavedRecipesByID);
router.post("/", API.saveRecipe);
router.delete("/", API.deleteSavedRecipes);
router.delete("/:id", API.deleteSavedRecipesByID);

module.exports = router;

const express = require("express");
const router = express.Router();
const API = require("../controllers/api");
const UserAPI = require("../controllers/userapi");

router.get("/", API.getSavedRecipes);
router.get("/:id", API.getSavedRecipesByID);
router.post("/", API.saveRecipe);
router.delete("/", API.deleteSavedRecipes);
router.delete("/:id", API.deleteSavedRecipesByID);

router.get("/login", UserAPI.authenticateUser);

module.exports = router;

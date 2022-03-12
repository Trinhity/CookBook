const express = require("express");
const router = express.Router();
const API = require("../controllers/api");
const UserAPI = require("../controllers/userapi");
const multer = require("multer");

// multer middleware
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
}).single("image");

router.get("/", API.getSavedRecipes);
router.get("/:id", API.getSavedRecipesByID);
router.post("/", upload, API.saveRecipe);
router.delete("/", API.deleteSavedRecipes);
router.delete("/:id", API.deleteSavedRecipesByID);

router.get("/login", UserAPI.authenticateUser);

module.exports = router;

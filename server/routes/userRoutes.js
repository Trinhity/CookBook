const express = require("express");
const router = express.Router();
const UserAPI = require("../controllers/userController");
const auth = require("../config/auth");

router.post("/register", UserAPI.registerNewUser);
router.post("/login", UserAPI.loginUser);
router.get("/me", auth, UserAPI.getUserDetails);

module.exports = router;

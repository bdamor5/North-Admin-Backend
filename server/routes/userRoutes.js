const express = require("express");
const router = express.Router();

//controllers
const { registerUser, loginUser } = require("../controllers/userControllers");

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;

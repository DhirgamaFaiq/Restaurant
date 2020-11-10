
const express = require("express");
const router = express.Router();
const userController = require("../controller/user_controller.js");

router.post("/register", userController.createUser);


module.exports = router;
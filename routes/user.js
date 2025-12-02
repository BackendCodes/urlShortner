const express = require("express");
const { loginController, registerController } = require("../controllers/authController");

const userRoutes = express.Router();


userRoutes.post('/login',loginController);

userRoutes.post('/register',registerController);

module.exports = userRoutes;

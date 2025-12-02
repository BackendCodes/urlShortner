const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const userModel = require("../models/user");
// const {getUser,setUser} = require('../middlewares/auth')
const jwt = require("jsonwebtoken");

exports.loginController = async (req, res) => {
  const { email, password } = req.body;

  //   basic validation
  if (!email || !password) {
    return res.status(400).redirect("/register");
  }

  try {
    // check if user Exists in db
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).redirect("/register");
    }

    // check password
    if (password !== user.password) {
      return res.status(400).redirect("/login");
    }

    const token = jwt.sign(
      {
        user: user,
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token);

    return res.status(200).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, mxxessage: error.message });
  }
};

exports.registerController = async (req, res) => {
  const { name, email, password } = req.body;

  // basic validation
  if (!name || !email || !password) {
    return res.status(400).render("/register");
  }

  try {
    // check if user Exists in db
    const user = await userModel.findOne({ email });

    console.log(user);

    if (user) {
      return res.status(400).render("login");
    }

    const createUser = await userModel.create({
      name,
      email,
      password,
    });

    console.log(createUser);

    res.status(200).render("login");
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

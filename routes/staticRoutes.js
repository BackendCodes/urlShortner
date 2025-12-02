const express = require("express");
const StaticRoutes = express.Router();
const urlModel = require("../models/url");
const restrictToLoogedinUserOnly = require("../middlewares/checkauth");
const isLoggedin = require("../middlewares/isloggedin");

StaticRoutes.get("/", restrictToLoogedinUserOnly, async (req, res) => {
  const userid = req.user;

  if (!userid) return res.redirect("/login");

  const allurls = await urlModel.find({ createdBy: userid });

  res.render("index", {
    urls: allurls,
    baseUrl: process.env.BASE_URL,
  });
});

StaticRoutes.get("/login", isLoggedin, (req, res) => {
  res.render("login");
});

StaticRoutes.get("/register", isLoggedin, (req, res) => {
  res.render("register");
});

module.exports = StaticRoutes;

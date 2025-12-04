const express = require("express");
const generateUrl = require("../controllers/GenerateShortUrl");
const RedirectUrl = require("../controllers/RedirectUrl");
const getAnalytics = require("../controllers/GetAnalytics");
const restrictToLoogedinUserOnly = require("../middlewares/checkauth");
const generateDiscordUrl = require("../controllers/GenerateDiscordShortUrl");

const urlRoutes = express.Router();

urlRoutes.post("/", restrictToLoogedinUserOnly, generateUrl);

urlRoutes.post('/discord', generateDiscordUrl)

urlRoutes.get("/:id", RedirectUrl);

urlRoutes.get("/analytics/:url", restrictToLoogedinUserOnly, getAnalytics);

module.exports = urlRoutes;

const express = require("express");
const urlRoutes = express.Router();
const { generateUrl, generateDiscordUrl } = require("../controllers/generate");
const RedirectUrl = require("../controllers/redirect");
const { getAnalytics } = require("../controllers/analytics");
const { restrictToLoogedinUserOnly } = require("../middlewares/auth");

// POST routes
urlRoutes.post("/", restrictToLoogedinUserOnly, generateUrl);
urlRoutes.post("/discord", generateDiscordUrl);

urlRoutes.post('/discord/', generateDiscordUrl)

urlRoutes.get("/:id", RedirectUrl);

urlRoutes.get("/analytics/:url", restrictToLoogedinUserOnly, getAnalytics);

// GET redirect (MUST BE LAST)
urlRoutes.get("/:id", RedirectUrl);

module.exports = urlRoutes;

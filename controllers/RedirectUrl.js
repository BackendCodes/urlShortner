const mongoose = require("mongoose");
const urlModel = require("../models/url");

const RedirectUrl = async (req, res) => {
  const { id } = req.params;

  try {
    const urlid = await urlModel.findOneAndUpdate({
      shortId: id,
    },{
      $push: {
        visitHistory :{timestamp:Date.now()}
      }
    });

    if (!urlid) {
      res.json({
        message: "No Short Url exist",
      });
    }

    res.redirect(urlid.redirectURL);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = RedirectUrl;

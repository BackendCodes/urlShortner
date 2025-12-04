const mongoose = require("mongoose");
const urlModel = require("../models/url");
const discordUrlModel = require("../models/discordurl")

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

    


    const urlid1 = await discordUrlModel.findOneAndUpdate({
      shortId: id,
    },{
      $push: {
        visitHistory :{timestamp:Date.now()}
      }
    });


    console.log(urlid1);

    if (!urlid &&  !urlid1) {
      res.json({
        message: "No Short Url exist",
      });
    }

    if(urlid){
       return res.redirect(urlid.redirectURL)
    }else if(urlid1){
      return res.redirect(urlid1.redirectURL)
    }

  } catch (error) {
    console.log(error.message);
  }
};

module.exports = RedirectUrl;

const urlModel = require("../models/url");
const { nanoid, customAlphabet } = require("nanoid");

console.log(nanoid(8));

const generateUrl = async (req, res) => {
  const { url } = req.body;
  const userid = req.user;

  try {
    const shorturl = await urlModel.create({
      shortId: nanoid(8),
      redirectURL: url,
      visitHistory:[],
      createdBy: userid
    });

    res.status(201).render('index.ejs',{url:shorturl.shortId});
  } catch (error) {}
};

module.exports = generateUrl;

const discordUrl = require("../models/discordurl");
const { nanoid, customAlphabet } = require("nanoid");

const generateDiscordUrl = async (req, res) => {
  const { url } = req.body;

  try {
    const shorturl = await discordUrl.create({
      shortId: nanoid(8),
      redirectURL: url,
      visitHistory: [],
    });

    res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/url/${shorturl.shortId}`,
    });
  } catch (error) {
    console.log(error.message, "at discord");
  }
};

module.exports = generateDiscordUrl;

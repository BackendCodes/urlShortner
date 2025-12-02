const urlModel = require("../models/url");

const getAnalytics = async (req, res) => {
  const { url } = req.params;

  const analytics = await urlModel
    .findOne({ shortId: url })
    .select("visitHistory");

  res.json({
    totalclicks: analytics.visitHistory.length,
    analytics: analytics,
  });
};

module.exports = getAnalytics;

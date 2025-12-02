const jwt = require("jsonwebtoken");

const restrictToLoogedinUserOnly =  (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const verifytoken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verifytoken.id;

    return next();
  } catch (error) {
    console.log(error.message);
    return res.redirect("/login");
  }

  
};

module.exports = restrictToLoogedinUserOnly;

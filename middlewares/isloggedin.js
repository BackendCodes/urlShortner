const jwt = require("jsonwebtoken");

const isLoggedin =  (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
   return  next();
  }

  try {
    const verifytoken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verifytoken.id;
    return res.redirect("/");
  } catch (error) {
    console.log(error.message);
      next();
  }


};

module.exports = isLoggedin;

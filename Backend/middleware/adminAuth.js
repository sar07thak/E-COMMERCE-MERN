const jwt = require("jsonwebtoken");


const isAdmin = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({ msg: "user does not have token" });
    }

    const payload = jwt.verify(token, process.env.JWTKEY);
    console.log(payload);

    const { email } = payload;

    if (!email) {
      throw new Error("Invalid token");
    }

    req.adminEmail = process.env.ADMIN_EMAIL;

    next();
  } catch (err) {
    console.log("isAdmin error", err);
    return res.status(500).json({ message: `isAdmin error ${err.message}` });
  }
};

module.exports = { isAdmin };

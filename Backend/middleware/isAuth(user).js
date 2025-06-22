const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({ msg: "user does not have token" });
    }

    const payload = jwt.verify(token, process.env.JWTKEY);
    console.log("Decoded payload:", payload);

    const { userId } = payload;
    if (!userId) {
      throw new Error("Invalid token");
    }

    req.userId = userId;
    next();
  } catch (err) {
    console.log("isAuth error", err);
    return res.status(500).json({ message: `isAuth error ${err.message}` });
  }
};

module.exports = {
  isAuth,
};
const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Token missing" });  // ✅ Changed from 400 to 401 (Unauthorized)
    }

    // ✅ Decode the token and log what's inside
    const payload = jwt.verify(token, process.env.JWTKEY);
    console.log("Decoded token payload:", payload);  // ✅ Optional debug added

    const { userId } = payload;

    if (!userId) {
      return res.status(401).json({ message: "Invalid token payload" });  // ✅ Better message
    }

    req.userId = userId;
    next();
  } catch (err) {
    console.log("isAuth error", err);  // ✅ Logs actual error
    return res.status(500).json({ message: `isAuth error ${err.message}` });
  }
};

module.exports = { isAuth };

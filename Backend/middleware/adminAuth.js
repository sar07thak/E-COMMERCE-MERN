const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWTKEY);

    // ✅ Compare decoded email with ADMIN_EMAIL
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }

    // ✅ Pass data to next middleware/route
    req.adminEmail = decoded.email;
    next();
  } catch (err) {
    console.error("isAdmin error:", err);
    return res.status(401).json({ message: `Invalid token: ${err.message}` });
  }
};

module.exports = { isAdmin };

const User = require("../models/userModel");

const getCurrentUser = async (req, res) => {
  try {
    
    console.log("userId from token:", req.userId);
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "user is not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.log("getCurrentUser error");
    return res.status(500).json({ message: `getCurrentUser error ${err}` });
  }
};

module.exports = {
  getCurrentUser,
};

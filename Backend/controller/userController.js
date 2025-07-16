const validator = require("validator");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { genToken, genToken1 } = require("../config/token");

const register = async (req, res) => {
  try {
    const { userName, password, email } = req.body;

    const checkUser = await User.findOne({ email });
    const checkEmail = validator.isEmail(email);

    // ✅ Check if user already exists
    if (checkUser) {
      return res.status(409).send("User already exists!"); // 409 Conflict is better than 404
    }

    // ✅ Validate email
    if (!checkEmail) {
      return res.status(400).send("Email is not valid!");
    }

    // ✅ Validate password strength
    if (password.length < 6) {
      return res
        .status(400)
        .send("Password must be at least 6 characters long.");
    }

    // ✅ Hash the password correctly
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    // ✅ Sign JWT
    const token = await genToken(newUser._id);

    // ✅ Set cookie and return success
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send("User registered successfully!");
  } catch (err) {
    res.status(500).json({ message: `Register Error: ${err.message}` });
  }
};

const login = async (req, res) => {
  try {
    console.log("Login request body:", req.body); // ✅ Optional debug

    const { email, password } = req.body;

    const validEmail = validator.isEmail(email);

    // ✅ Input validation
    if (!validEmail) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Compare passwords
    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Generate token with userId
    const token = await genToken(existUser._id);
    console.log("Generated token:", token); // ✅ Optional debug

    // ✅ Set cookie and respond
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({ message: "User login successful" }); // ✅ Changed to JSON for consistency
  } catch (err) {
    console.log("Login error:", err); // ✅ Optional debug
    res.status(500).json({ message: `Login Error: ${err.message}` });
  }
};

const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).send("Logout successful!");
  } catch (err) {
    res.status(500).json({ message: `Logout Error: ${err.message}` });
  }
};

const googleLogin = async (req, res) => {
  try {
    console.log("body : ", req.body);
    let { userName, email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        userName,
        email,
      });
    }

    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log("googleLogin error");
    return res.status(500).json({ message: `googleLogin error ${error}` });
  }
};

const adminLogin = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = await genToken1(email);

      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .json({ message: "admin login complete ! ", token }); // ✅ added return here
    }

    return res.status(401).json({ message: "Invalid admin Credentials" }); // ❗ changed to 401 for unauthorized
  } catch (err) {
    res.status(500).json({ message: `Admin login Error: ${err.message}` });
  }
};

module.exports = {
  register,
  login,
  logOut,
  googleLogin,
  adminLogin,
};

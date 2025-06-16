const validator = require("validator");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { userName, password, email } = req.body;

    const checkUser = await User.findOne({ email });
    const checkEmail = validator.isEmail(email);

    if (checkUser) {
      return res.status(404).send("User already exists !");
    }

    if (!checkEmail) {
      return res.status(400).send("Email is not valid !");
    }

    if (password.length < 4) {
      return res.status(400).send("Enter a strong password");
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      userName,
      email,
      password,
    });

    const token = jwt.sign(
      {
        userName: userName,
        email: email,
        _id: newUser._id,
      },
      process.env.JWTKEY,
      {
        expiresIn: 3600,
      }
    );

    res.status(201).cookie("token", token).send("user register sucessfully ! ");
  } catch (err) {
    res.status(404).json({ message: `Register Error ${err}` });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email ) throw new Error("invalid email");

    if (!password) throw new Error("invalid password");

    const existUser = await User.findOne({email});

    const ans = await bcrypt.compare(password, existUser.password);
     
    if (!ans) throw new Error("Invalid ans");

    const token = jwt.sign(
      {
        userName: userName,
        email: email,
        _id: newUser._id,
      },
      process.env.JWTKEY,
      {
        expiresIn: 3600,
      }
    )

    res.status(200).cookie("token" , token ).send("User login Sucessfully !");

  } catch (err) {
    res.status(404).json({ message: `Login Error ${err}` });
  }
};

const logOut = async ( req , res ) => {
    try{
        res.clearCookie("token");
        res.status(200).send("Logout successful!");
    }catch(err) {
       res.status(404).json({ message: `Login Error ${err}` });
   }
}


module.exports = {
  register,
  login ,
  logOut
};

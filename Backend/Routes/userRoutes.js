const express = require("express");
const { register, login, logOut, googleLogin } = require("../controller/userController");
const router = express.Router();

//* Register Route
router.post("/register", register);

//* Login Route
router.post("/login", login);

//* Logout Route
router.get("/logOut", logOut);

router.post("/gooleLogin", googleLogin );

module.exports = router;

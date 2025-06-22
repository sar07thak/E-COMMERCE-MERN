const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/isAuth(user)");
const { getCurrentUser } = require("../controller/realTimeUserController");

router.get("/getCurrentUser", isAuth, getCurrentUser);

module.exports = router;

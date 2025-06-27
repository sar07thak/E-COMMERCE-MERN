const express = require("express");
const router = express.Router();

const { isAuth } = require("../middleware/isAuth.js");
const { getCurrentUser, getAdmin } = require("../controller/realTimeUserController");
const { isAdmin } = require("../middleware/adminAuth");

router.get("/getCurrentUser", isAuth, getCurrentUser);
router.get("/getAdmin", isAdmin, getAdmin);

module.exports = router;

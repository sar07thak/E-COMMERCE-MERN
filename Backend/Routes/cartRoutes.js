const express = require('express');
const { isAuth } = require('../middleware/isAuth.js');
const { getUserCart , addToCart , UpdateCart} = require("../controller/cartController")

const router = express.Router();


router.post('/get', isAuth, getUserCart);
router.post('/add', isAuth, addToCart);
router.post('/update', isAuth, UpdateCart);

module.exports = router ;
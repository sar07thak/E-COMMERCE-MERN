const express = require('express');
const { isAuth } = require('../middleware/isAuth');
const { placeOrder } = require('../controller/OrderController');

const router = express.Router();


router.post("/placeorder",isAuth , placeOrder)


module.exports = router;
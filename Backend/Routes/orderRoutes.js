const express = require('express');
const { isAuth } = require('../middleware/isAuth');
const { placeOrder, userOrders } = require('../controller/OrderController');

const router = express.Router();


router.post("/placeorder",isAuth , placeOrder)

router.post("/userorder",isAuth , userOrders)

module.exports = router;
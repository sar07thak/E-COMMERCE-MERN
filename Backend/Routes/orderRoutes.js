const express = require('express');
const { isAuth } = require('../middleware/isAuth');
const { placeOrder, userOrders, allOrders, updateStatus, placeOrderRazorPay } = require('../controller/OrderController');
const { isAdmin } = require('../middleware/adminAuth');

const router = express.Router();

// for user
router.post("/placeorder",isAuth , placeOrder)
router.post("/userorder",isAuth , userOrders)
router.post("/razorpay",isAuth,placeOrderRazorPay)

// for admin
router.post("/list", isAdmin , allOrders ) ;
router.post("/status" , isAdmin , updateStatus)


module.exports = router;
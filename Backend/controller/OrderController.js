const Order = require("../models/orderModel")
const User = require("../models/userModel")

const placeOrder = async ( req, res ) => {
    try{
        const { items , amount , address } = req.body;
        const userId = req.userId ;
        const orderData = {
            items,
            amount,
            address,
            userId,
            status: 'Order Placed',
            paymentMethod: 'COD',
            date: Date.now()
        }
        const newOrder = new Order(orderData);
        await newOrder.save();

        await User.findByIdAndUpdate( userId , { cartData : {}});

        return res.status(201).json({ message: "Order placed successfully", order: newOrder });
    }catch(err){
        console.error("Error placing order:", err);
        res.status(500).json({ message: "place order error" });
    }
}

module.exports = {
    placeOrder
}   
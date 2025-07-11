const Order = require("../models/orderModel")
const User = require("../models/userModel")
const Razorpay = require('razorpay');

const currency = "inr";
const Razorpayinstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID ,
    key_secret: process.env.RAZORPAY_KEY_SECRET ,
});

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
            payment: false ,
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

const placeOrderRazorPay = async (req, res) =>{ 
    try{
        const { items , amount , address } = req.body ;
        const userId = req.userId ;
        const orderData = {
            items,
            amount,
            address,
            userId,
            status: 'Razorpay',
            paymentMethod: 'COD',
            payment: false ,
            date: Date.now()
        }
        const newOrder = new Order(orderData);
        await newOrder.save();
        
        const options = {
            amount : amount*100 ,
            currency : currency.toUpperCase(),
            receipt : newOrder._id.toString()
        }
        await Razorpayinstance.orders.create(options , (error,order) =>{
            if(error){
                console.log(error);
                return res.status(500).json(error)
            }
            res.status(200).json(order)
        })
    }catch(err){
        console.error("Error placing order:", err);
        res.status(500).json({ message: "place order error" });
    }
}



const verifyRazorpay = async (req,res) =>{
    try {
        const userId = req.userId
        const {razorpay_order_id} = req.body
        const orderInfo = await Razorpayinstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid'){
            await Order.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await User.findByIdAndUpdate(userId , {cartData:{}})
            res.status(200).json({message:'Payment Successful'
            })
        }
        else{
            res.json({message:'Payment Failed'
            })
        }
    } catch (error) {
        console.log(error)
         res.status(500).json({message:error.message
            })
    }
}


const userOrders = async ( req , res ) => {
    try{
        const userId = req.userId;
        const orders = await Order.find({ userId });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        return res.status(200).json(orders);
    }catch(err){
        console.log("Error fetching user orders:", err);
        return res.status(500).json({ message: "Error fetching user orders" });
    }
}





const allOrders = async ( req , res ) => {
    try{
        const orders = await Order.find({});

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        return res.status(200).json(orders);
    }catch(err){
        console.log("Error fetching all orders:", err);
        return res.status(500).json({ message: "Error fetching all orders" });
    }
}

const updateStatus = async ( req , res ) => {
    try{
        const { orderId , status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ message: "Order status updated successfully", order: updatedOrder });
    }catch(err){    
        
        console.error("Error updating order status:", err);
        return res.status(500).json({ message: "Error updating order status" });
    }
}



module.exports = {
    placeOrder ,
    userOrders ,
    allOrders ,
    updateStatus ,
    placeOrderRazorPay ,
    verifyRazorpay
}   
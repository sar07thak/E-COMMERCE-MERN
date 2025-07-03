const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new Schema({
    userName : {
        type : String ,
        required : true 
    } , 
    password : {
        type : String , 
    } ,
    email : {
        type : String ,
        required : true
    } ,
    cartData : {
        type : Object ,
        default : {}
    }
} , { timestamps : true })


const user = mongoose.model("user" , userSchema );

module.exports = user 



const uploadOnCloudinary = require("../config/cloudinary.js");
const Product  = require("../models/productModel.js");


const addProduct = async (req, res) => {
  try {
    const { name , description , price , category ,
         subCategory , sizes , bestseller   } = req.body ;

         const image1 = await uploadOnCloudinary(req.files.image1[0].path)
         const image2 = await uploadOnCloudinary(req.files.image2[0].path)
         const image3 = await uploadOnCloudinary(req.files.image3[0].path)
         const image4 = await uploadOnCloudinary(req.files.image4[0].path)

         const productData = {
            name ,
            description ,
            price : Number(price) ,
            category ,
            subCategory ,
            sizes : JSON.parse(sizes) ,
            bestseller : bestseller === "true" ? "true" : "false" ,
            date : Date.now() ,
            image1 , 
            image2 ,
            image3 , 
            image4
         }

         const product = await Product.create(productData);

         return res.status(201).json(product);
  } catch (err) {
        console.log("AddProduct error:", err); // ✅ Optional debug
        res.status(500).json({ message: `ADDproduct Error: ${err.message}` });
  }
};

const deleteProduct = async (req, res) => {
  try {
  } catch (err) {}
};

const updateProduct = async (req, res) => {
  try {
  } catch (err) {}
};

module.exports = {
    addProduct ,
    deleteProduct ,
    updateProduct
}
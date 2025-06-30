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

const  listProducts = async ( req , res ) => {
  try{
    const allProducts = await Product.find({}) ;
    return res.status(200).json(allProducts);
  }catch{
    console.log("ListProducts error:", err); // ✅ Optional debug
    res.status(500).json({ message: `ListProducts Error: ${err.message}` });
  }
}


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });

  } catch (err) {
    console.log("DeleteProduct error:", err); // ✅ Optional debug
    res.status(500).json({ message: `DeleteProduct Error: ${err.message}` });
  }
};


module.exports = {
    addProduct ,
    deleteProduct ,
    listProducts 
}
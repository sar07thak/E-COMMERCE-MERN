const express = require("express");
const { addProduct, listPRoducts, deleteProduct } = require("../controller/productController");
const router = express.Router();
const upload = require("../middleware/multer");
const { isAdmin } = require("../middleware/adminAuth");

router.post("/addproduct",upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

router.get("/listproducts",listPRoducts );

router.delete("/deleteProduct/:id", isAdmin , deleteProduct);


module.exports =  router ;

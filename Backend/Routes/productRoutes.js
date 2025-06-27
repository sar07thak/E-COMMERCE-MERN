const express = require("express");
const { addProduct } = require("../controller/productController");
const router = express.Router();
const upload = require("../middleware/multer");

router.post(
  "/addproduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

module.exports =  router ;

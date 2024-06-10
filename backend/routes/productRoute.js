const express = require("express");
const router = express.Router();

const {createProduct, upLoadProductImage, getProducts, deleteProduct, getSingleProduct, updateProduct, updateProductImage} = require("../controllers/productController");
const { authenticateUser, adminOnly } = require("../middlewares/authenticate-user");

router.post("/createProduct",authenticateUser,adminOnly,createProduct);
router.post("/upLoadProductImage",upLoadProductImage);
router.post("/updateProductImage",updateProductImage)
router.get("/getProducts",getProducts);
router.delete("/:id",deleteProduct);
router.get("/getSingleProduct/:id",getSingleProduct)
router.patch("/updateProduct/:id",updateProduct)

module.exports = router;
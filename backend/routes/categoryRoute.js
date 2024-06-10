const express = require("express");
const router = express.Router();


const {authenticateUser,adminOnly} = require("../middlewares/authenticate-user");
const {createCategory, getCategories, deleteCategory} =require("../controllers/categoryController");

router.post("/createCategory",authenticateUser,adminOnly,createCategory);
router.get("/getCategories",getCategories);
router.delete("/:slug",deleteCategory);

module.exports = router;
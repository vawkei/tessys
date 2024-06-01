const express = require("express");
const router = express.Router()

const {authenticateUser,adminOnly} = require("../middlewares/authenticate-user")
const {register, verifyEmail, login, logout, getLoginStatus, getUser, uploadUserPhoto} = require("../controllers/userController");

router.post("/register",register);
router.post("/verifyEmail",verifyEmail);
router.post("/login",login);
router.get("/logout",logout);
router.get("/getLoginStatus",getLoginStatus);
router.get("/getUser",authenticateUser, getUser)
router.post("/uploadUserPhoto",uploadUserPhoto)

module.exports = router;
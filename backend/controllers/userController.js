const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const path = require("path");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

//1.register===================================================================:
const register = async (req, res) => {
  const { name, email, password, confirmedPassword, enteredPhoneNumber } =
    req.body;
  console.log(name, email, password, confirmedPassword, enteredPhoneNumber);

  if (
    !name ||
    !email ||
    !password ||
    !confirmedPassword ||
    !enteredPhoneNumber
  ) {
    return res.status(400).json({ msg: "input fields can't be empty" });
  }
  if (enteredPhoneNumber.length !== 11) {
    return res.status(400).json({ msg: "phone number must be 11 digits." });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: "password characters should be more than 6" });
  }
  if (password !== confirmedPassword) {
    return res.status(401).json({ msg: "passwords don't match" });
  }

  try {
    console.log("about to Harsh password");

    const salt = await bcrypt.genSalt(10);
    const harshPassword = await bcrypt.hash(password, salt);

    console.log("Harsh password completed");

    console.log("about to create verificationToken");
    const verificationToken = crypto.randomBytes(40).toString("hex");
    console.log("verificationToken completed");
    //first user registered as admin:
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? "admin" : "customer";

    const tempData = {
      name: name,
      email: email,
      phone: enteredPhoneNumber,
      password: harshPassword,
      verificationToken: verificationToken,
      role: role,
    };

    console.log("about to register user in db");
    const user = await User.create(tempData);
    console.log("user registered");

    const origin = process.env.REACT_APP_FRONTEND_URL;
    await sendVerificationEmail({
      name: user.name,
      email: user.email,
      verificationToken: user.verificationToken,
      origin: origin,
    });
    console.log("email verification sent");
    res
      .status(201)
      .json({ msg: "Please check your email box to verify your account" });
  } catch (error) {
    res.status(500).json(error.message);
    console.log({ msg: error });
  }
};

//2. verifyEmail=====================================================================:
const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  console.log("verifyEmail:", verificationToken, email);

  if (!verificationToken || !email) {
    return res.status(401).json({ msg: "email verification failed1" });
  }

  const user = await User.findOne({ email });
  console.log("get user using his email");
  if (!user) {
    return res.status(401).json({ msg: "user not registered" });
  }

  if (verificationToken !== user.verificationToken) {
    return res.status(401).json({ msg: "email verification failed2" });
  }

  user.isVerified = true;
  user.verificationToken = "";
  user.verifiedDate = Date.now();
  await user.save();

  res.status(200).json({ msg: "email verification successful", user: user });
};

//3. login=====================================================================:
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "input fields shouldn't be empty" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "user doesn't exist" });
    }
    if (user.isVerified === "false") {
      return res.status(401).json({ msg: "please verify your email" });
    }

    console.log("Compare passwords.........");
    const passwordValidity = async (incominPwd, pwInDB) => {
      const isValid = await bcrypt.compare(incominPwd, pwInDB);
      return isValid;
    };

    const validPassword = await passwordValidity(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    console.log("Done Comparing passwords.........");

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET_V,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    if (user && validPassword) {
      const oneDay = 1000 * 60 * 60 * 24;
      const { _id, name, email, role, phone, photo } = user;
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        // secure:true, should be commented out during development
        // sameSite:"none"
      });
      res.status(201).json({
        msg: "user logged in",
        user: { _id, name, email, role, phone, photo },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  // res.send("<h1>Login Route </>")
};

// 4 logout===========================================================================:
const logout = (async = (req, res) => {
  try {
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
      // secure:true,
      // samseSite:"none"
    });
    res.status(200).json({ msg: "user logged out successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// 5 getLoginStatus===================================================================:
const getLoginStatus = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(404).json({ msg: "no token found in app" });
  }

  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_V);
  if (verifiedToken) {
    console.log("token verified");
    return res.json(true);
  } else {
    console.log("Failed to verify token");
  }

  // res.send("getLoginStatus
};

// 6 getUser=======================================================================:
const getUser = async (req, res) => {
  const userId = req.user.userId;
  // console.log(userId);

  try {
    const user = await User.findOne({ _id: userId }).select("-password");
    console.log(user);

    if (!user) {
      return res.status(404).json({ msg: `no user with id ${userId}` });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }

  // res.send("getUser");
};

// 7 uploadUserPhoto to cloudinary================================================:
const uploadUserPhoto = async (req, res) => {
  console.log(req.files.image);

  try {
    if (!req.files) {
      return res.status(400).json({ msg: "no files uploaded" });
    }

    console.log(req.files.image);

    const maxSize = 1024 * 1024;
    if (req.files.image.size > maxSize) {
      return res
        .status(400)
        .json({ msg: "please upload image smaller than 1mb" });
    }

    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      { use_filename: true, folder: "tessysUserProfilePhoto" }
    );

    console.log(result);

    res
      .status(200)
      .json({ msg: { src: result.secure_url, publicID: result.public_id } });
    fs.unlinkSync(req.files.image.tempFilePath);
  } catch (error) {
    console.log(error);
  }
};

//updateUserPhoto in db============================================================
const updateUserPhoto = async (req, res) => {
  const userId = req.user.userId;
  console.log(userId);

  const { photo } = req.body;
  console.log(photo);

  try {
    const user = await User.findOne({ _id: userId });
    console.log(user);

    if (!user) {
      return res.status(404).json({ msg: `no user with id: ${userId} found` });
    }

    user.photo = photo;
    const updatedUser = await user.save();
    console.log("updatedUser:", updatedUser);

    res
      .status(201)
      .json({ msg: "user photo updated in db", updatedUser: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//updateUser =====================================================================
const updateUser = async (req, res) => {
  const userId = req.user.userId;

  const { name, surname, phone, address, town, state } = req.body;
  if (!name || !surname || !phone || !address || !town || !state) {
    return res.status(400).json({ msg: "input feilds shouldn't be empty" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        name: name,
        surname: surname,
        phone: phone,
        address: address,
        town: town,
        state: state,
      },
      { new: true, runValidators: true }
    );
    res.status(201).json({msg:"user updated",updatedUser:user})
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//getAllUsers=====================================================================
const getAllUsers = async (req,res) =>{
    const userId = req.user.userId;
    console.log(userId);

    const user = await User.findOne({_id:userId}).select("-password");
    
    if(!user){
      return  res.status(404).json({msg:`no user with id: ${userId}`})
    };
    
    if(user.role === "admin"){
      const allUsers = await User.find({}).select("-password");
      res.status(200).json({allUsers:allUsers});
    }else{
      return null
    }

}

module.exports = {
  register,
  verifyEmail,
  login,
  logout,
  getLoginStatus,
  getUser,
  uploadUserPhoto,
  updateUserPhoto,
  updateUser,
  getAllUsers
};

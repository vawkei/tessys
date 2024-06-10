const jwt = require("jsonwebtoken");
const User = require("../models/user");


const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      msg: "you are not authorized to access this route, please log in",
    });
  }
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_V);
  console.log(verifiedToken);
  req.user = { userId: verifiedToken.userId, name: verifiedToken.name };
  next();
};

const adminOnly = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      msg: "you are not authorized to access this route, please log in",
    });
  };

  const verifiedToken = jwt.verify(token,process.env.JWT_SECRET_V);
  console.log("adminOnly:",verifiedToken);
//   req.user = { userId: verifiedToken.userId, name: verifiedToken.name };

  const user = await User.findOne({_id:req.user.userId}).select("-password");

  if(verifiedToken && user.role==="admin"){
    next()
  }else{
    return res.status(401).json({msg:"you are not allowed to view this route."})
  }

};

module.exports = { authenticateUser,adminOnly };

require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const errorHandlerMiddleware = require("./middlewares/error-handler-middleware")

//require routes:
const productRoute = require("./routes/productRoute");
const userRoute  = require("./routes/userRoute");

app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: ["http://localhost:3000", "https://tessysapp.onrender.com"],
  methods: ["GET", "POST"],
  allowedHeaders: ["my-custom-header"],
  credentials: true,
};

app.use(
  cors({
    origin: ["http://localhost:3000", "https://tessysapp.onrender.com"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser()); 

app.use(fileUpload({useTempFiles:true}));
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//api routes:
app.use("/api/v1/products", productRoute);
app.use("/api/v1/auth",userRoute);

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000;
//========start with this when the app is still basic without a db==========//

// app.listen(port, "localhost", () => {
//   console.log("it's on");
//   console.log(`Server listening on port ${port}`);
// });

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    app.listen(port,"localhost",()=>{
      console.log("it's on");
      console.log(`Server listening on port ${port}`)
    })
  } catch(error) {
    console.log(error)
  }
};

start()

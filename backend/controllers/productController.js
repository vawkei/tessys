const Product = require("../models/products");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

//1: createProduct===============================================================:
const createProduct = async (req, res) => {
  const { name, category, quantity, price, description, image, publicID } =
    req.body;

  if (!name || !category || !quantity || !price || !description || !image) {
    return res.status(400).json("please fill out the inputs");
  }

  const createdData = {
    name: name,
    category: category,
    quantity: quantity,
    price: price,
    description: description,
    image: image,
    publicID: publicID,
    createdBy: req.user.userId,
  };

  try {
    const product = await Product.create(createdData);
    res
      .status(201)
      .json({ msg: "product created successfully.", product: product });
  } catch (error) {
    // if(error){
    // console.log({msg: `${error.errors.description.message}`})
    // }
    console.log(error);
    res.status(500).json(error);
  }
};
// 2 upLoadProductImage=============================================================
const upLoadProductImage = async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ msg: "no files uploaded" });
  }

  console.log(req.files.image);

  const maxSize = 1024 * 1024;
  if (req.files.image > maxSize) {
    return res
      .status(400)
      .json({ msg: "please upload image smaller than 1mb" });
  }

  try {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      { use_filename: true, folder: "tessysProductPhotos" }
    );
    console.log(result);
    res
      .status(201)
      .json({ msg: { src: result.secure_url, publicID: result.public_id } });
    fs.unlinkSync(req.files.image.tempFilePath);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//updateProductImage==============================================================
const updateProductImage = async (req, res) => {
  const { oldImagePublicId } = req.body; // ID of the old image

  try {
    if (!req.files) {
      return res.status(400).json({ msg: "no files uploaded" });
    }

    console.log(req.files);

    if (oldImagePublicId) {
      await cloudinary.uploader.destroy(oldImagePublicId);
    }

    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      { use_filename: true, folder: "tessysProductPhotos" }
    );

    res
      .status(200)
      .json({ msg: { src: result.secure_url, publicID: result.public_id } });
    fs.unlinkSync(req.files.image.tempFilePath);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//getProducts=======================================================================
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res.status(404).json({ msg: "no products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//deleteProduct============================================================
const deleteProduct = async (req, res) => {
  const productID = req.params.id;
  console.log("this is the productID", productID);

  try {
    const productToDelete = await Product.findOneAndDelete({
      _id: productID,
    });
    if (!productToDelete) {
      return res.status(404).json({ msg: `no product with id: ${productID}` });
    }

    res.status(200).json({ msg: "product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//getSingleProduct==============================================================
const getSingleProduct = async (req, res) => {
  const productID = req.params.id;
  console.log("This is the productID:", productID);

  if (!productID) {
    return res.status(404).json({ msg: `no product with id ${productID}` });
  }

  try {
    const product = await Product.findOne({ _id: productID });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//updateProduct=====================================================================
const updateProduct = async (req, res) => {
  const productID = req.params.id;
  console.log(productID);

  const { name, category, quantity, price, image, description } = req.body;

  const data = { name, category, quantity, price, image, description };

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productID },
      data,
      { new: true, runValidators: true }
    );

    if (!updateProduct) {
      return res.status(404).json(`No product with id: ${productID}`);
    }

    res.status(200).json({
      msg: "product updated successfully",
      updatedProduct: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  createProduct,
  upLoadProductImage,
  updateProductImage,
  getProducts,
  deleteProduct,
  getSingleProduct,
  updateProduct,
};

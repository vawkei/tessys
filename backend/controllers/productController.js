const Product = require("../models/products");

//1: createProduct===============================================================:
const createProduct = async (req, res) => {
  const { name, category, quantity, price, description, image } = req.body;

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
    regularPrice: regularPrice,
    createdBy: userId,
  };

  const product = await Product.create(createProduct);
  res
    .status(201)
    .json({ msg: "product created successfully.", product: product });
};

module.exports = { createProduct };

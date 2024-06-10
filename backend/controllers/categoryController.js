const Category = require("../models/category");
const slugify = require("slugify");

//1 createCategory===================================================================
const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ msg: "input feild shouldn't be empty" });
  }

  const categoryExists = await Category.findOne({ name: name });
  if (categoryExists) {
    return res.status(401).json({ msg: `The ${name} category already exists` });
  }

  try {
    const categoryName = await Category.create({
      name: name,
      slug: slugify(name),
    });
    res.status(201).json({ msg: "new category created", categoryName });
    console.log("category created", categoryName);
  } catch (error) {
    console.log(error);
    if (error) {
      return res.status(500).json(error.errors.name.properties.message);
    }
  }
};

//2 getCategories=====================================================================
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort("-createdAt");
    console.log(categories);
    res.status(200).json({ categories: categories, nbhits: categories.length });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// 3 deleteCategory=============================================================
const deleteCategory = async (req, res) => {
  const slug = req.params.slug;
  
  console.log(`This is the slug:${slug}`)

  if (!slug) {
    return res.status(400).json({ msg: "input can't be empty" });
  }

  try {
    const category = await Category.findOneAndDelete({ slug: slug });
    res.status(200).json({ msg: `${slug} category deleted successfully.` });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createCategory, getCategories, deleteCategory };

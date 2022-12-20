const { Product } = require("../models");

const Create = async (req, res) => {
  try {
    let product = await Product.create(req.body);
    return res.status(201).json({
      message: "product created",
      data: product,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("server issues");
  }
};

const FetchById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    return res.status(200).json({
      message: "product fetched",
      data: product,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("server issues");
  }
};

const FetchAll = async (req, res) => {
  try {
    let products = await Product.find({}).populate("category");
    return res.status(200).json({
      message: "Products fetched",
      data: products,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("server issues");
  }
};

const Update = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    await product.updateOne(req.body);
    return res.status(200).json({
      message: "product updated",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("server issues");
  }
};

const Delete = async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ message: "cannot delete a none existent  product" });
    return res.status(200).json({
      message: "Product deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("server issues");
  }
};

module.exports = {
  Create,
  FetchAll,
  FetchById,
  Update,
  Delete,
};

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: Number,
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    image: {
      type: String,
    },
    stock: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

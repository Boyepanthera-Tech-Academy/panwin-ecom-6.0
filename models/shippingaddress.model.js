const mongoose = require("mongoose");

const shippingAddressSchema = new mongoose.Schema(
  {
    fullName: String,
    streetAddress: String,
    phone: String,
    country: {
      type: mongoose.Types.ObjectId,
      ref: "Country",
    },
  },
  { timestamps: true }
);

const ShippingAddress = mongoose.model(
  "ShippingAddress",
  shippingAddressSchema
);
module.exports = ShippingAddress;

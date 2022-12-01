const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);

const Country = mongoose.model("Country", countrySchema);
module.exports = Country;

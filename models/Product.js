const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: { type: String, require: [true, "name is required*"] },
    price: { type: Number, require: [true, "price is required*"] },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    company: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", ProductSchema);

const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const ProductSchema = new mongoose.Schema(
  {
    type: String,
    branch: String,
    model: String,
    imageUrl: String,
    price: Number,
    details: String,
    stock: Number,
    annulled: { type: Boolean, default: false },
    annulledBy: {
      type: ObjectId,
      ref: "Person",
    },
    createdBy: {
      type: ObjectId,
      ref: "Person",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Product", ProductSchema, "Products")

const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  numReviews: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model("Product", productSchema)

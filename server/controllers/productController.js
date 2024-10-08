const Product = require("../models/productModels")
const mongoose = require("mongoose")

// get all products
const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 })

  res.status(200).json(products)
}

// get single product
const getProduct = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" })
  }
  const product = await Product.findById(id)
  if (!product) {
    return res.status(404).json({ error: "No such product" })
  }
  res.status(200).json(product)
}

// create new product
const createProduct = async (req, res) => {
  const { title, price, description, image, category } = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push("title")
  }
  if (!price) {
    emptyFields.push("price")
  }
  if (!description) {
    emptyFields.push("description")
  }
  if (!image) {
    emptyFields.push("image")
  }
  if (!category) {
    emptyFields.push("category")
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields })
  }

  try {
    const product = await Product.create({
      title,
      price,
      description,
      image,
      category,
    })
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" })
  }
  const product = await Product.findOneAndDelete({ _id: id })
  if (!product) {
    return res.status(404).json({ error: "No such product" })
  }
  res.status(200).json(product)
}

// update product
const updateProduct = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" })
  }
  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  )
  if (!product) {
    return res.status(404).json({ error: "No such product" })
  }
  res.status(200).json(product)
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
}

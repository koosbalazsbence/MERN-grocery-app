const express = require("express")
const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController")
const router = express.Router()

// GET all products
router.get("/", getProducts)

// GET single product
router.get("/:id", getProduct)

// POST new product
router.post("/", createProduct)

// DELETE a single product
router.delete("/:id", deleteProduct)

// Update a single product
router.put("/:id", updateProduct)

module.exports = router

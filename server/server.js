require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

// create express app
const app = express()

// PORT
const port = process.env.PORT || 5000

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use("/api/products", require("./routes/products"))

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`MongoDB connected, listening on: http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })

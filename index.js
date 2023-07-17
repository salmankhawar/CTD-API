// import express
const express = require('express')
// import cors
const cors = require('cors')
//import dotenv 
require('dotenv').config()
// import mongoose
const mongoose = require('mongoose')
// import products schema
const Products = require('./model-products')
// import body parser 
const bodyParser = require('body-parser')


// run the express function
const app = express()

// run the cors function
app.use(cors())

// run the body parser function
app.use(bodyParser.json())

// databases
mongoose.connect(
  process.env.MONGODB_URL,
    console.log('Connected to MongoDB')
)


// create routes

// get route for all products
app.get('/', async (req, res) => {
  let products = await Products.find({})
  res.send(products)
  })

// create route for new product
app.post('/', async (req,res) => {
  let product = await Products.create(req.body)
  res.send("Success")
})

// patch route for updated quantity
app.patch('/:id', async (req, res) => {
  let product = await Products.findByIdAndUpdate(req.params.id, {
    count: req.body.count} ,
    {
    new: true
  })
  res.send(product)
})
  
  // keep the server open
  app.listen(4000, () => {
    console.log('Server is Listening.')
  })
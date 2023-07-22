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
// import sgMail
const sgMail = require('@sendgrid/mail')



// run the express function
const app = express()

// run the cors function
app.use(cors())

// run the body parser function
app.use(bodyParser.json())

// setup sgMail API Key
sgMail.setApiKey(
  process.env.SENDGRID_API_KEY, 
    console.log('Connected to SgMail')
    )

// databases
mongoose.connect(
  process.env.MONGODB_URL,
    console.log('Connected to MongoDB')
)


// routes

// get route for all products
app.get('/', async (req, res) => {
  try {
  let products = await Products.find({})
  res.send(products) } catch(err) {
    throw(err), console.log(err)
  } 
  })

// create route for new product
app.post('/', async (req,res) => {
  try {let product = await Products.create(req.body)
  res.send("Product Sucessfully Created!")} catch(err) {
   console.log(err) 
  }
})

// patch route for updated quantity send email if the count is zero
app.patch('/:id', async (req, res) => {
  let dbProduct = await Products.findById(req.params.id)
  try { 
    if (dbProduct.count != req.body.count) {
  let product = await Products.findByIdAndUpdate(req.params.id, {
    count: req.body.count} ,
    {
    new: true
  }) 
  res.send('Quantity Updated!')
  if (product.count === 0) {
  sgMail.send({
  to: process.env.MY_EMAIL, 
  from: process.env.SENDER_EMAIL,
  subject: `Your product ${product.title} is out of stock`,
  text: 'please consider restocking it',
  html: `<strong>It is to inform you that your product ${product.title} is out of stock, please consider restocking it.
  It was being sold at ${product.price} ${product.currency} per  ${product.uom}</strong>`
  }
).then(() => {
  console.log('Email sent!')
})
.catch((error) => {
  console.error(error)
})
}
} else {
res.send('Quantity Already Exists!')}
  } catch(err) {
    console.log(err)
  }
})



  // keep the server open
  app.listen(4000, () => {
    console.log('Server is Listening.')
  })
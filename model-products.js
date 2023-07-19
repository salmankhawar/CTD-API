const mongoose = require('mongoose')


let Products = mongoose.model('products', {
    title: {
        type: String,
        required: true,
      },
    description: {
      type: String,
      required: true,
    },
    photo: String,
    price: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    uom: {
      type: String,
      required: true,
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'GBP']
      }
    
  })

module.exports = Products
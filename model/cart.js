const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
   _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
   },
   name: {
      type: String,
      required: true
   },
   image: {
      type: String,
      required: true
   },
   desc: {
      type: String,
      required: true
   },
   quantity: {
      type: Number,
      required: true
   },
   price: {
      type: Number,
      required: true
   }
})

module.exports = mongoose.model('Cart', cartSchema)
const router = require('express').Router()
const Product = require('../model/product')

router.post('/', async (req, res) => {
   const product = new Product({
      name: req.body.name,
      image: req.body.image,
      desc: req.body.desc,
      quantity: req.body.quantity,
      price: req.body.price
   })
   try {
      const some1 = await product.save()
      res.json({
         success: true,
         data: some1
      })
   } catch (err) {
      res.status(400).json({
         success: false,
         message: err
      })
   }
})

router.get('/', async (req, res) => {
   try {
      const allProduct = await Product.find()
      res.send(allProduct)
   } catch (err) {
      res.status(400).json({
         success: false,
         message: err
      })
   }
})

module.exports = router
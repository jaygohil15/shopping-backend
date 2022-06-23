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
      res.send(some1)
   } catch (err) {
      res.status(400).send(err)
   }
})

router.get('/', async (req, res) => {
   try {
      const allProduct = await Product.find()
      res.send(allProduct)
   } catch (err) {
      res.status(400).send(err)
   }
})

module.exports = router
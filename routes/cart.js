const router = require('express').Router()
const cart = require('../model/cart')
const Cart = require('../model/cart')
const Product = require('../model/product')
const mongoose = require('mongoose')


router.post('/', async (req, res) => {

   try {
      // const foundProduct = await Product.findById(req.body._id)
      const foundProduct = await Product.findById(req.body._id)
      if (foundProduct === null) {
         res.status(400).end('Invalid Request.Product not found')
      }

      // const foundProductCart = await Cart.findById(req.body._id)
      const foundProductCart = await Cart.findById(req.body._id)

      if (foundProductCart === null) {
         // throw new Error('Product Not Found')
         console.log(foundProductCart)
         const cart = new Cart({
            _id: req.body._id,
            name: req.body.name,
            image: req.body.image,
            desc: req.body.desc,
            quantity: req.body.quantity,
            price: req.body.price
         })
         const prodCount = foundProduct.quantity - req.body.quantity
         if (prodCount < 0) {
            res.status(400).end('Product is not available')
         } else {
            foundProduct.quantity = prodCount
            foundProduct.save()
            cart.save()
            res.send('Product Successfully added to cart.')
         }

      } else {

         const prodCount = foundProduct.quantity - req.body.quantity
         if (prodCount < 1 || req.body.quantity < 1) {
            res.status(400).end('Product is not available')
         } else {
            foundProduct.quantity = prodCount
            foundProductCart.quantity = foundProductCart.quantity + req.body.quantity
            foundProductCart.save()
            foundProduct.save()
            res.send('Product Successfully added to cart.')
         }
      }

   } catch (err) {
      console.log(err)
      res.status(400).end(err.message)
   }
})

router.get('/', async (req, res) => {

   try {
      const allCartProd = await Cart.find()
      res.send(allCartProd)
   } catch (err) {
      res.status(400).end(err)
   }
})

router.put('/', async (req, res) => {
   try {

      // console.log(req.body)

      // if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
      //    res.status(400).json({
      //       success: false,
      //       message: 'Invalid doc id'
      //    })
      // } else {
      const foundProduct = await Product.findById(req.body._id)
      if (foundProduct === null) {
         res.status(400).end('Invalid Request.Product not found in Product Collection')
         return
      }

      const foundProductCart = await Cart.findById(req.body._id)
      if (foundProductCart === null) {
         res.status(400).json({
            success: false,
            message: 'Invalid Request.Product not found in Cart Collection'
         })
         return
      } else {
         if (req.body.type == 'increment') {
            if (foundProduct.quantity <= 0) {
               res.status(400).end('Product is not available')
            } else {
               foundProduct.quantity -= 1
               foundProductCart.quantity += 1
               foundProduct.save()
               foundProductCart.save()
               res.send('Product of quantity 1 Successfully added to cart.')
            }
         } else {
            foundProduct.quantity += 1
            foundProductCart.quantity -= 1
            foundProduct.save()
            console.log(foundProduct, foundProductCart)
            if (foundProductCart.quantity < 1) {
               foundProductCart.remove()
            } else {
               foundProductCart.save()
            }
            res.json({
               success: true,
               message: 'Product of quantity 1 Successfully removed from cart.'
            })
         }
      }
      // }

   } catch (error) {
      console.log(error)
      res.status(400).send('Error Occured...')
   }
})

router.delete('/', async (req, res) => {
   try {
      // const foundProd = await Cart.findById(req.body._id)
      // if (foundProd === null) {
      //    res.status(400).send('Invalid req. Product not found in cart collection...')
      // }
      // else {

      // }

      Cart.findByIdAndDelete(req.body._id, (err, data) => {
         if (err || data === null) {
            if (err) console.log(err.message)
            res.status(404).send('Product not found...')
         } else {
            Product.findById(data._id, (err, doc) => {
               if (err) {
                  console.log(err)
                  res.status(400).send(err.message)
               } else {
                  doc.quantity += data.quantity
                  doc.save()
               }
            })
            res.status(200).send('Product successfully deleted...')
         }
      })

   } catch (error) {
      console.log(error)
      res.status(400).send(error.message)
   }
})

module.exports = router
const express = require('express')
const dotenv = require('dotenv')
// const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')

const app = express()
dotenv.config()
// app.use(cors())

mongoose.connect(process.env.DB_CONNECT, () => {
   console.log('Connected to DB...')
})

if (process.env.NODE_ENV === 'dev') {
   app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/product', productRoute)
app.use('/api/cart', cartRoute)

app.listen(process.env.PORT, () => {
   console.log(`Server started on ${process.env.PORT}...`)
})
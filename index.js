const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require('helmet')

const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')

const app = express()
app.use(cors())
app.use(helmet())
dotenv.config()

mongoose.connect(process.env.DB_CONNECT, () => {
   console.log('Connected to DB...')
})

if (process.env.NODE_ENV === 'dev') {
   app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/product', productRoute)
app.use('/api/cart', cartRoute)
// app.get('/', (req, res) => {
//    res.send('Success')
// })

app.listen(process.env.PORT, () => {
   console.log(`Server started on ${process.env.PORT}...`)
})
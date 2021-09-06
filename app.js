require('dotenv').config()

const express = require('express')

const app = express()

const notFoundMiddleWare = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// middleware

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

app.use(express.json())

// routes

app.get('/', (req, res) => {
  res.send('Store API')
})

app.use('/api/v1/products', productsRouter)

// products route

app.use(notFoundMiddleWare)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()

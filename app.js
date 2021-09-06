require('dotenv').config()

const express = require('express')

const app = express()

const notFoundMiddleWare = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// middleware

app.use(express.json())

// routes

app.get('/', (req, res) => {
  res.send('Store API')
})

// products route

app.use(notFoundMiddleWare)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = () => {
  try {
    // connectDB
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()

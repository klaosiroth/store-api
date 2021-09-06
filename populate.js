require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')
const jsonProducts = require('./products.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)

    // deletes all databases in the Product collection
    await Product.deleteMany()
    
    // creates a new document from product.json 
    await Product.create(jsonProducts)
    console.log('Successfully!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()

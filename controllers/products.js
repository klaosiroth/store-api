const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort('-name price') // sort => {{baseUrl}}/products?sort=-name,price
  res.status(200).json({ nbHits: products.length, products })
}

const getAllProducts = async (req, res) => {
  const { 
    featured,
    company,
    name,
    sort,
  } = req.query
  const queryObject = {}

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }

  if (company) {
    queryObject.company = company
  }

  // search google: mongodb query operators
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  console.log(queryObject)

  let result = Product.find(queryObject)
  
  // sort
  if (sort) {
    console.log(sort)
    const sortList = sort.split(',').join(' ')
    console.log(sortList)
    result = result.sort(sortList)
  } else {
    result = result.sort('createAt')
  }

  const products = await result
  res.status(200).json({ nbHits: products.length, products })
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
}

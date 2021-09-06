const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  // {baseUrl}}/products?sort=-name,price&fields=name,price&limit=10&skip=5
  const products = await Product.find({})
  .sort('name')         // sort   => {{baseUrl}}/products?sort=name
  .select('name price') // select => {{baseUrl}}/products?fields=name,price
  .limit(10)            // limit  => {{baseUrl}}/products?limit=name,price
  .skip(5)              // skip   => {{baseUrl}}/products?skip=name,price
  res.status(200).json({ nbHits: products.length, products })
}

const getAllProducts = async (req, res) => {
  const { 
    featured,
    company,
    name,
    sort,
    fields,
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

  // select
  if (fields) {
    console.log(fields)
    const fieldsList = fields.split(',').join(' ')
    console.log(fieldsList)
    result = result.select(fieldsList)
  }

  const products = await result
  res.status(200).json({ nbHits: products.length, products })
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
}

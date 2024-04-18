const express = require('express')
const router = express.Router()
const { auth } = require('../middlewares')
const { CatalogProductsController } = require('../controllers')

// Generate instance "CatalogProductsController"
const catalogProductsController = new CatalogProductsController()

// Endpoint for get all products and get a product by id
router.get('/products', auth, catalogProductsController.getProducts)

// Endpoint for create a new product
router.post('/products', auth, catalogProductsController.createProduct)

// Endpoint for updated a product by id
router.put('/products', auth, catalogProductsController.updatedProduct)

// Endpoint for delete a product by id
router.delete('/products', auth, catalogProductsController.deleteProduct)

module.exports = router
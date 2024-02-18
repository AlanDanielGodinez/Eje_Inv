const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');

// Get all products
router.get('/', (req, res) => {
    res.json(productController.getAllProducts());
});

// Get a single product by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = productController.getProductById(id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});
// Get a product by name
router.get('/search/:name', (req, res) => {
    const { name } = req.params;
    const product = productController.getProductByName(name);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

// Create a new product
router.post('/', (req, res) => {
    const { name, description, price, cantidad } = req.body;
    const newProduct = productController.createProduct(name, description, price, cantidad);
    res.status(201).json(newProduct);
});

// Update a product
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price, cantidad } = req.body;
    const updatedProduct = productController.updateProduct(id, name, description, price, cantidad);
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).send('Product not found');
    }
});

// Delete a product
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const success = productController.deleteProduct(id);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).send('Product not found');
    }
});

// Get total inventory value
router.get('/inventory/value', (req, res) => {
    const totalValue = productController.calculateTotalInventoryValue();
    res.json({ totalValue });
});

// Get products sorted by price
router.get('/sort/price', (req, res) => {
    const { order } = req.query; // Expect 'asc' or 'desc'
    const sortedProducts = productController.sortProductsByPrice(order);
    res.json(sortedProducts);
});

// Get products filtered by stock quantity
router.get('/filter/stock', (req, res) => {
    const { minQuantity } = req.query;
    const filteredProducts = productController.filterProductsByStock(minQuantity);
    res.json(filteredProducts);
});

module.exports = router;

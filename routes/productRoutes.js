const express = require('express');
const router = express.Router();
require('dotenv').config();

const Product = require('../models/Product');

router.post('/add', async (req, res) => {
    const { productName, description, category, isVeg, amount, imageUrl } = req.body;

    try {
        const newProduct = new Product({ productName, description, category, isVeg, amount, imageUrl });
        await newProduct.save();

        res.status(201).json({ message: 'Product registered successfully!' });
    } catch (error) {
        // Log the error for debugging
        console.error('Error during product registration:', error);

        if (error.code === 11000) {
            return res.status(400).json({ message: 'Product Name already exist' });
        }

        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

//Get route to fetch all Products
router.get('/getItems', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: 'Services retrieved', products });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

//Get route to fetch single Product
router.get('/getItem/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//update details for users
router.put('/updateItem', async (req, res) => {
    try {
        const { productName,
            description,
            category,
            isVeg,
            amount,
            imageurl,
            _id } = req.body;
        const updateProduct = await Product.findByIdAndUpdate(_id, { productName,
            description,
            category,
            isVeg,
            amount,
            imageurl,
            _id }, { new: true });
        if (!updateProduct) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json({ updateProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/deleteItem/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleteProduct = await Product.findByIdAndDelete(id);
        if (!deleteProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
module.exports = router;










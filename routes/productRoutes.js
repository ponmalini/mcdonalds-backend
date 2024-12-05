const express = require('express');
const router = express.Router();
require('dotenv').config();

const Product = require('../models/Product');

router.post('/add', async (req, res) => {
    const { productName, description, category, isVeg, amount } = req.body;

    try {
        const newProduct = new Product({ productName, description, category, isVeg, amount });
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




module.exports = router;










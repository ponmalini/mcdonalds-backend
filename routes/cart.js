const express = require('express');
const router = express.Router();
require('dotenv').config();

const Cart = require('../models/Cart');

router.post('/addCart', async (req, res) => {
    const { productName, mobileNumber, amount, quantity, imageUrl,orderConfirmed } = req.body;

    try {
        const newCart = new Cart({ productName, mobileNumber, amount, quantity, imageUrl,orderConfirmed });
        await newCart.save();

        res.status(201).json({ message: 'Cart registered successfully!' });
    } catch (error) {
        // Log the error for debugging
        console.error('Error during product registration:', error);

        if (error.code === 11000) {
            return res.status(400).json({ message: 'Cart Name already exist' });
        }

        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
router.get('/getCart/:mobileNumber', async (req, res) => {
    try {
        const mobileNumber = req.params.mobileNumber;
        const cart = await Cart.find();
        res.status(200).json(cart.filter(e => e.mobileNumber == mobileNumber && e.orderConfirmed==false));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/confirmOrder/:mobileNumber', async (req, res) => {
    try {
        const mobileNumber = req.params.mobileNumber;
        const cart = await Cart.updateMany({'mobileNumber':mobileNumber},{$set:{orderConfirmed: true}});
        res.status(200).json({'success':'Ok'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/getOrderData/:mobileNumber', async (req, res) => {
    try {
        const mobileNumber = req.params.mobileNumber;
        const cart = await Cart.find();
        res.status(200).json(cart.filter(e => e.mobileNumber == mobileNumber && e.orderConfirmed==true));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/deleteCart/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleteCart = await Cart.findByIdAndDelete(id);
        if (!deleteCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.delete('/deleteCartByMobileNumber/:mobileNumber', async (req, res) => {
    const { mobileNumber } = req.params;

    try {
        const deleteCart = await Cart.deleteMany({ mobileNumber });
        if (!deleteCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});





module.exports = router;
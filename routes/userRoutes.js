const express = require('express');
const router = express.Router();
require('dotenv').config();

const User = require('../models/user');


router.post('/SignUp', async (req, res) => {
    const { name, email,mobileNumber } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ mobileNumber });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create and save user (schema middleware will hash the password)
        const newUser = new User({ name, email,mobileNumber });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.code === 11000) { 
            return res.status(400).json({ message: 'Mobile Number already in use' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
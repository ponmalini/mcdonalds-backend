const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');


router.post('/SignUp', async (req, res) => {
    const { name, email, mobileNumber } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ mobileNumber });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create and save user (schema middleware will hash the password)
        const newUser = new User({ name, email, mobileNumber });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Mobile Number already in use' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

//Login Route
router.post('/sendOtp', async (req, res) => {
    const { mobileNumber } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ mobileNumber });
        if (!user) {
            return res.status(400).json({ message: 'Invalid User' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

//Login Route
router.post('/Login', async (req, res) => {
    const { mobileNumber,otp } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ mobileNumber });
        if (!user) {
            return res.status(400).json({ message: 'Invalid User' });
        }
        if(otp!=='0691')
        {
            return res.status(400).json({ message: 'Invalid Otp' });
        }

         // Generate JWT token
         const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '5m' }
        );

        res.status(200).json({ message: 'Login successful',token,userDetails:user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


module.exports = router;










const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    amount: { type : Number, required: true },
    quantity: { type: String, required: true },
    imageUrl: { type: String, required: true }, 
    orderConfirmed: { type: Boolean, required: true }
});

cartSchema.pre('save', async function (next) {
    next();
});

// Export the model
module.exports = mongoose.model('cart', cartSchema);

const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    productName: { type: String, required: true,unique : true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    isVeg: { type: Boolean, required: true }, 
    amount: { type : Number, required: true },
    imageUrl: { type: String, required: true } 
});

productSchema.pre('save', async function (next) {
    next();
});

// Export the model
module.exports = mongoose.model('products', productSchema);

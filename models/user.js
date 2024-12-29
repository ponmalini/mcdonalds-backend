const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    mobileNumber: { type: Number, required: true, unique: true  } ,
    address: {type: String, required:true}
});

userSchema.pre('save', async function (next) {
    next();
});

module.exports = mongoose.model('User', userSchema);

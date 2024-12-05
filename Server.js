const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/McDonalds';
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch(error => console.error('Database connection error:', error));

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/register/', userRoutes);
const productRoutes = require('./routes/productRoutes');
app.use('/product/', productRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
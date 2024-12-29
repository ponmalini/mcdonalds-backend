const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require('multer');

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

// Default options, no immediate file access
//app.use(fileUpload());


// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/account/', userRoutes);
const productRoutes = require('./routes/productRoutes');
app.use('/product/', productRoutes);
const cartRoutes = require('./routes/cart');
app.use('/cart/', cartRoutes);

const upload = multer({ dest: 'public/uploads/' }).single('file');
app.post("/upload", upload, async (req, res) => {
    try {    
      if (req.file) {
        console.log(req);
        res.send({
          status: true,
          message: "File Uploaded!",
        });
      } else {
        res.status(400).send({
          status: false,
          data: "File Not Found :(",
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post("/submit-delivery", (req, res) => {
    const deliveryDetails = req.body;
    console.log("Received delivery details:", deliveryDetails);
  
    // Example: Save to database or process data here
    res.status(200).json({ message: "Delivery details submitted successfully", deliveryDetails });
  });
  

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const router = express.Router();
const multer = require('multer')
const fs = require('fs')
require('dotenv').config();
const upload = multer({ dest: 'uploads/' })
router.get('/images/:imageName', (req, res) => {
  // do a bunch of if statements to make sure the user is 
  // authorized to view this image, then

  const imageName = req.params.imageName
  const readStream = fs.createReadStream(`images/${imageName}`)
  readStream.pipe(res)
});

router.post('/api/images', upload.single('image'), (req, res) => {
 // const imageName = req.file.filename
  // Save this data to a database probably

  
  res.send('as')
});

module.exports = router;
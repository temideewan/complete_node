const multer = require('multer');
const path = require('path');

// set the multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

// file filters
const checkFileFilters = (req,file,cb) => {
  if(file.mimetype.startsWith('image')){
    cb(null, true)
  } else {
    cb(new Error('Only images are allowed'))
  }
}

// multer middleware
module.exports = multer({
  storage,
  fileFilter: checkFileFilters,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5mb file limit
  }
})

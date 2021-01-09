var express = require('express');
var router = express.Router();

// var fs = require('fs');
// const path = require("path") 

// var multer = require('multer');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

let CSV = require('csv-string')

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//       cb(null, 'uploads/');
//   },

//   // By default, multer removes file extensions so let's add them back
//   filename: function(req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');

// app.listen(port, () => console.log(`Listening on port ${port}...`));

router.post('/', function (req, res, next) {
  try{
    console.log("files",req.files);
  if(!req.files) {
    console.log('No file found in the request');
  } else {
  let avatar = req.files;
  console.log("avatar",avatar);
  let buffer = avatar.file.data;
  console.log("buffer",buffer);

  let ans =  buffer.toString("utf-8");
  const parsedCsv = CSV.parse(ans);
  console.log(parsedCsv);
    res.send({
      status: true,
      message: 'File is uploaded',
      data: {
        name: avatar.name,
        mimetype: avatar.minetype,
        size: avatar.size
      }
    })
  }
} catch(err) {
  console.error(err);
  res.status(500).send(err);
}
});

module.exports = router;

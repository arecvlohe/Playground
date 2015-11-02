var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './uploads/'});
var mongoose = require('mongoose');
var ImageUpload = mongoose.model('imageuploads');
var lwip = require('lwip');

router.get('/imageupload', function (req, res) {
  ImageUpload.find(function(err, imageuploads) {
    console.log(imageuploads);
    res.render('api', {title: 'Image Upload API', imageuploads : imageuploads});
  });
});

router.get('/imageupload/:id', function(req, res) {
  var query = {"_id": req.params.id};
  ImageUpload.findOne(query, function(err, imageupload) {
    console.log(imageupload);
    res.render(
      'imageupload',
      {title: 'Image Upload API - ' + imageupload.name, imageupload : imageupload}
    );
  });
});

router.post('/imageupload', upload.single('image'), function(req, res, next) {
  new ImageUpload({name: req.body.title, path: req.file.path + '_150x150'})
  .save(function(err, imageupload) {
    console.log(imageupload);
  });
  lwip.open(req.file.path, 'jpg', function(err, image) {
      image.batch()
        .resize(150, 150)
        .writeFile(req.file.path + '_150x150', 'jpg', function() {
          res.status(204).redirect('/api/imageupload');
        });
    });
});

router.put('/imageupload/:id', function(req, res) {
  var query = {"_id": req.params.id};
  var update = {name: req.body.name};
  var options = {new: true};
  ImageUpload.findOneAndUpdate(query, update, options, function(err, imageupload) {
    console.log(imageupload);
    res.render(
      'imageupload',
      {title: 'Image Upload API ' + imageupload.name, imageupload : imageupload}
    );
  });
});

router.delete('/imageupload/:id', function(req, res) {
  var query = {"_id": req.params.id};
  ImageUpload.findOneAndRemove(query, function(err, imageupload) {
    console.log(imageupload);
    res.redirect('/api/imageupload');
  });
});

module.exports = router;


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageUpload = new Schema(
  {
    name: String,
    path: String
  }
);

mongoose.model('imageuploads', ImageUpload);

mongoose.connect('mongodb://localhost/node-imageuploads');

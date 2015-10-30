var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Superhero = new Schema (
	{name: String}
);

mongoose.model('superheroes', Superhero);
mongoose.connect('mongodb://localhost/node-superhero');

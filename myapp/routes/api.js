var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Superhero = mongoose.model('superheroes');

router.get('/superheroes', function (req, res) {
	Superhero.find(function (err, superheroes){
		console.log(superheroes);	
		res.render(
			'api', 
			{title: 'Superhero API', superheroes : superheroes}
		);
	});
});

router.get('/superhero/:id', function (req, res) {
	var query = {"_id": req.params.id};
	Superhero.findOne(query, function(err, superhero) {
		console.log(superhero);
		res.render(
			'superhero',
			{title: 'Superhero API - '+ superhero.name, superhero : superhero}	
		);
	});
});

router.post('/superheroes', function(req, res) {
	new Superhero({name: req.body.name})
	.save(function(err, superhero){ 
		console.log(superhero);
		res.redirect('/api/superheroes');	
	});
});

router.put('/superhero/:id', function(req, res) {
	var query = {"_id": req.params.id};
	var update = {name: req.body.name};
	var options = {new: true};
	Superhero.findOneAndUpdate(query, update, options, function(err, superhero) {
		console.log(superhero);
		res.render(
			'superhero',
			{title: 'Superhero API - ' + superhero.name, superhero : superhero}	
		);	
	});
});

router.delete('/supero/:id', function(req, res) {
	var query = {"_id": req.params.id};
	Superhero.findOneAndRemove(query, function(err, superhero) {
		console.log(superhero);
		res.redirect('/api/superheroes');	
	});
});

module.exports = router;

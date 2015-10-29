var express = require('express');
var app = express();

app.use('/static', express.static(__dirname + 'public'));

app.use(function(req, res, next) {
	res.status(404).send("Sorry can't find that!");
});

app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.post('/', function(req, res) {
	res.send('Got a POST request');
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
												

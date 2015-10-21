'use strict';

var http = require('http'),
    url = 'http://api.openweathermap.org/data/2.5/weather?q=Tampa,FL&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f';

var getWeather = new Promise(function (resolve, reject) {
    http.get(url, function (res) {
        var body = '';
        res.setEncoding('utf8');
        res.on('error', function (error) {
            return console.error(error);
        });
        res.on('data', function (chunk) {
            return body += chunk;
        });
        res.on('end', function () {
            return resolve(body);
        });
    });
});

var parse = new Promise(function (resolve, reject) {
    resolve(getWeather.then(function (result) {
        return '\n\tThe current temperature is\n\t' + JSON.parse(result).main.temp.toFixed(1) + ' degrees\n\tin sunny Tampa, Florida';
    }));
});

var server = new Promise(function (resolve, reject) {
    resolve(http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        parse.then(function (result) {
            return res.end(result);
        });
    }));
});

server.then(function (result) {
    return result.listen(3000);
});

console.log('Server listening on port 3000');

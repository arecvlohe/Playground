'use strict';

var http = require('http');
var cities = ['Miami,FL', 'Tampa,FL', 'Seattle,WA', 'NewYork,NY'];

// Promise an array of urls
function urls() {
  var urlAPIs = [];
  return new Promise(function (resolve, reject) {
    resolve(urlAPIs = cities.map(function (city) {
      return ['http://api.openweathermap.org/data/2.5/weather?q=', city, '&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f'].join('');
    }));
  });
}

// urls().then(console.log); works

function getWeather(urls) {
  var feed = [];
  return new Promise(function (resolve, reject) {
    resolve(feed = urls.map(function (url, idx) {
      http.get(url, function (res) {
        feed[idx] = '';
        res.setEncoding('utf8');
        res.on('error', function (error) {
          return console.error(error);
        });
        res.on('data', function (chunk) {
          return feed[idx] += chunk;
        });
        res.on('end', function () {
          return console.log('logged entry ' + idx);
        });
      });
    }));
  });
}

urls().then(getWeather);

/*

function parse(data) {
  return new Promise((resolve, reject) => {
    var temp;
    var temps = [];
    var tempAvg;
    temp = JSON.parse(data).main.temp;
    temps.push(temp);
    resolve(
      tempAvg = temps.reduce((prv, nxt) => {
        var sum = prv + nxt;
        var avg = sum / cities.length + 1;
        return avg;
      })
    );
  });
}


function handler(req, res) {
  getWeather(urls())
    .then(parse)
    .then(result => res.write(result))
    .catch(error => console.error(error));
}

http.createServer(handler).listen(3000);
*/

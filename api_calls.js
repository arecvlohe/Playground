'use strict';

var http = require('http');
var cities = ['Miami, FL', 'Tampa, FL', 'Seattle, WA', 'New York, NY'];

function getUrls() {
  return new Promise(function (resolve) {
    resolve(cities.map(function (city) {
      return ['http://api.openweathermap.org/data/2.5/weather?q=', city, '&appid=bd82977b86bf27fb59a04b61b657fb6f'].join('');
    }));
  });
}

function getWeatherData(urls) {
  var count = 0;
  var feed = [];
  return new Promise(function (resolve) {
    feed = urls.map(function (url, idx) {
      http.get(url, function (res) {
        feed[idx] = '';
        res.on('error', function (error) {
          console.error(error);
        });
        res.on('data', function (chunk) {
          feed[idx] += chunk;
        });
        res.on('end', function () {
          count += 1;
          console.log('logged entry ' + idx);
          if (count == cities.length) {
            resolve(feed);
          }
        });
      });
    });
  });
}

function parseData(allData) {
  var tempAvg;
  return new Promise(function (resolve) {
    resolve(tempAvg = allData.map(function (data) {
      return JSON.parse(data).main.temp;
    }).reduce(function (prv, nxt) {
      var sum = prv + nxt;
      var avg = sum / cities.length + 1;
      return avg;
    }));
  });
}

function serve(temp) {
  http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('The average temperature for ' + cities[0] + ', ' + cities[1] + ', ' + cities[2] + ', and ' + cities[3] + ' is ' + temp.toFixed(1) + ' degrees Kelvin');
    res.end(console.log('Retrieving info'));
  }).listen(3000);
}

getUrls().then(function (results) {
  return getWeatherData(results).then(function (results) {
    return parseData(results).then(function (result) {
      return serve(result);
    })['catch'](function (error) {
      return console.error(error);
    });
  });
});

'use strict';

let http = require('http');
let cities = [
  'Miami, FL',
  'Tampa, FL',
  'Seattle, WA',
  'New York, NY'
];

function getWeatherData(city) {
  return new Promise((resolve) => {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bd82977b86bf27fb59a04b61b657fb6f&units=imperial`
    let data = '';
    http.get(url, res => {
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data).main.temp));
    });
  });
}

function parseData(data) {
  let summation = data.reduce((sum, temperature) => sum + temperature, 0);
  return summation / data.length;
}

function handleResponse(req, res) {
  Promise
    .all(cities.map(getWeatherData))
    .then(parseData)
    .then(avgTemp => {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(`The average temperature for ${cities[0]}, ${cities[1]}, ${cities[2]}, and ${cities[3]} is ${avgTemp.toFixed(1)} degrees Fahrenheit`);
      res.end(console.log('Retrieving info'));
    })
    .catch(err => console.error(err));
}

http.createServer(handleResponse).listen(3000);

'use strict';

const http = require('http');
const weatherUrl  = 'http://api.openweathermap.org/data/2.5/weather?q=Tampa,FL&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f';

function getWeather(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('error', error => console.error(error));
      res.on('data', chunk => body+=chunk);
      res.on('end', () => resolve(body));
    });
  });
}

function parseWeatherData(data) {
  return `
    The current temperature is
    ${JSON.parse(data).main.temp.toFixed(1)} degrees
    in sunny Tampa, Florida.
  `;
}

function handleRequest(req, res) {
  getWeather(weatherUrl)
    .then(parseWeatherData)
    .then(result => res.end(result))
    .catch(err => console.error(err));
}

http.createServer(handleRequest).listen(3000);

console.log('Server listening on port 3000');

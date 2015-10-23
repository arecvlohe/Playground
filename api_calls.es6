let http = require('http');
let cities = [
  'Miami, FL',
  'Tampa, FL',
  'Seattle, WA',
  'New York, NY'
];

function getWeatherDataFrom(city) {
  return new Promise((resolve) => {
    var body = '';
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bd82977b86bf27fb59a04b61b657fb6f`;
    http.get(url, (res) => {
      res.on('error', error => {
        console.error(error);
      });
      res.on('data', chunk => {
        body+=chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(body).main.temp);
      });
    });
  });
}


function parseDataFrom(weatherData) {
  var sum = weatherData.reduce((prv, nxt) => {
    return prv + nxt;
  }, 0);
  return sum / weatherData.length;
}

function handleResponse(req, res) {
  var promises = cities.map((city) => {
    return getWeatherDataFrom(city);
  });
  Promise.all(promises)
    .then(parseDataFrom)
    .then(temp => {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(`The average temperature for [${cities}] is ${temp.toFixed(1)} degrees Kelvin`);
      res.end(console.log('Retrieving info'));
    })
    .catch(error => console.error(error));
}

http.createServer(handleResponse).listen(3000);

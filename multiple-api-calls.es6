let http = require('http');
let cities = [
  'Miami,FL',
  'Tampa,FL',
  'Seattle,WA',
  'NewYork,NY'
];


// Promise an array of urls
function urls() {
  var urlAPIs = [];
  return new Promise((resolve, reject) => {
    resolve(
      urlAPIs = cities.map(function(city) {
        return ['http://api.openweathermap.org/data/2.5/weather?q=', city,'&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f'].join('');
      })
    );
  });
}

// urls().then(console.log); works

function getWeather(urls) {
  return new Promise((resolve, reject) => {
    var feed = [];
    resolve(
      Promise.all(
          feed = urls.map((url, idx) => {
            http.get(url, (res) => {
              feed[idx] = '';
              res.setEncoding('utf8');
              res.on('error', error => console.error(error));
              res.on('data', chunk => feed[idx]+=chunk);
              res.on('end', () => console.log(`logged entry ${idx}`));
            });
          })
        )
      );
  });
}

urls().then(results => getWeather(results).then(console.log));

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

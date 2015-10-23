let http = require('http');
let cities = [
  'Miami, FL',
  'Tampa, FL',
  'Seattle, WA',
  'New York, NY'
];


function getUrls() {
  return new Promise((resolve) => {
    resolve(
      cities.map((city) => {
       return ['http://api.openweathermap.org/data/2.5/weather?q=',city,'&appid=bd82977b86bf27fb59a04b61b657fb6f'
       ].join('');
      })
    );
  });
}


function getWeatherData(urls) {
  var count = 0;
  var feed = [];
  return new Promise((resolve) => {
    feed = urls.map((url, idx) => {
      http.get(url, (res) => {
        feed[idx] = '';
        res.on('error', error => {
          console.error(error);
        });
        res.on('data', chunk => {
          feed[idx]+=chunk;
        });
        res.on('end', () => {
          count+=1;
          console.log(`logged entry ${idx}`);
          if(count==cities.length) {
            resolve(feed);
          }
        });
      });
    });
  });
}


function parseData(allData) {
  var tempAvg;
  return new Promise((resolve) => {
    resolve(
      tempAvg = allData.map((data) => {
        return JSON.parse(data).main.temp;
      }).reduce((prv, nxt) => {
        var sum = prv + nxt;
        var avg = sum / cities.length + 1;
        return avg;
      })
    );
  });
}


function serve(temp) {
  http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(`The average temperature for ${cities[0]}, ${cities[1]}, ${cities[2]}, and ${cities[3]} is ${temp.toFixed(1)} degrees Kelvin`);
    res.end(console.log('Retrieving info'));
  }).listen(3000);

}


getUrls()
  .then(results => getWeatherData(results)
  .then(results => parseData(results)
  .then(result => serve(result))
  .catch(error => console.error(error))));

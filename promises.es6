'use strict';

let http = require('http'),
    url  = 'http://api.openweathermap.org/data/2.5/weather?q=Tampa,FL&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f'

// Calls out to the API and retrieves the information

/**
  We typically want to wrap the creation of our promise into a function. 
  Otherwise, `getWeather` is only evaluated once and will always
  be the same resolved promise containing the same temperature. 
  We actually want it to be called on every request so that it always gets
  the current temperature. 

    function getWeather() {
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

  Then we call it as a function and handle the returned promise.
  
    getWeather().then(...handle result...)
    
 */
 let getWeather =
     new Promise((resolve, reject) => {
         http.get(url, (res) => {
             var body = ''
             res.setEncoding('utf8')
             res.on('error', error => console.error(error))
             res.on('data', chunk => body+=chunk)
             res.on('end', () => resolve(body))
         })
     })


// Parses the getWeather response and makes a nice sentence

/**
  We want to do the same thing with `parse` by making it a function 
  that returns a promise. 

    function parse() {
      return new Promise((resolve, reject) => {
        resolve(getWeather.then(result => '\n\tThe current temperature is\n\t' + (JSON.parse(result).main.temp).toFixed(1) + ' degrees\n\tin sunny Tampa, Florida'));
      });
    }

  And we call it as a function...

    parse().then(result => res.end(result));
    
*/
let parse =
    new Promise((resolve, reject) => {
        resolve(getWeather.then(result => '\n\tThe current temperature is\n\t' + (JSON.parse(result).main.temp).toFixed(1) + ' degrees\n\tin sunny Tampa, Florida'))
    })


// Server startes up on local host 3000

/**
  Instead of creating a new promise that always resolves, we can use the shortcut 
  `Promise.resolve()` to return a 'thenable' object immediately. 
 
    let server = Promise.resolve(
      http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type':'text/plain'});
        parse.then(result => res.end(result));
      });
    );
    
 */
let server =
    new Promise((resolve, reject) => {
        resolve(
            http.createServer((req, res) => {
                res.writeHead(200, {'Content-Type':'text/plain'})
                parse.then(result => res.end(result))
            })
        )
    })

// Waits for the server
server.then(result => result.listen(3000))

console.log('Server listening on port 3000')

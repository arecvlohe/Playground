let http = require('http'),
    url  = 'http://api.openweathermap.org/data/2.5/weather?q=Tampa,FL&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f'

// Calls out to the API and retrieves the information
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
let parse =
    new Promise((resolve, reject) => {
        resolve(getWeather.then(result => '\n\tThe current temperature is\n\t' + (JSON.parse(result).main.temp).toFixed(1) + ' degrees\n\tin sunny Tampa, Florida'))
    })


// Server startes up on local host 3000
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

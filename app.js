const express = require('express')
const app = express()
const port = 8000
const data = require('./weather.json')
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const key = "Enter your key"
const expiry = new Date()
expiry.setDate(expiry.getDate() + 7);


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    const allowedOrigins = ['https://editor.swagger.io', 'https://hoppscotch.io', 'https://app.swaggerhub.com/','https://inspector.swagger.io/'];
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    // Request methods you wish to allow eg: GET, POST, OPTIONS, PUT, PATCH, DELETE
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

app.get('/v1/hello', (req, res) => {
  res.send('Welcome to Open Mock Weather Services!')
})

app.post('/v1/auth', (req, res) => {
  username = req.body.username
  password = req.body.password
  if (username == "jeevan" && password == "jeev"){
  token = {
	 "jwt" : key,
    "expires": expiry 
	
  }
  res.json(token)
}
res.send("Check your credentials.")
})

// POST method route
app.post('/', function (req, res) {
    res.send('POST request to the homepage')
})

app.get('/v1/weather', get_weather) 

function get_weather(request,response) {
  //console.dir(request.method)
  //console.dir(request.hostname)
  //console.dir(request.ip)
  //console.dir(request.originalUrl)
  response.json(data)
}

app.all('/data/2.5/weather/', get_weather)

app.listen(port,() => {
  console.log(`Weather API listening on port ${port}`)
})

const express = require('express')
const app = express()
const port = 8001
const data = require('./weather.json')
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY3M1NjEtc2UiLCJwYXNzIjoiTGV0TWVJbiJ9.8f2w5c4XgSdIPjfLLKsbNGE9QV8aOnN6SeJoldv7FSU"
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



app.get('/v1/hello', (request, response) => {
  const authHeader = request.headers['authorization']
  console.log(authHeader)
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return response.sendStatus(401)

  if (token == key ){
    return response.json('You are in!')
  }
  
  return response.sendStatus(403).send("Invalid Token")
})

app.get('/v1/weather', get_weather) 

function get_weather(request,response) {
  const authHeader = request.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.dir(token)
  console.dir(key)
  if (token == null) return response.sendStatus(401)

  if (token == key ){
    //console.dir(request.method)
    //console.dir(request.hostname)
    //console.dir(request.ip)
    console.dir(request.originalUrl)
    return response.json(data)
  }
  
  return response.sendStatus(403).send("Invalid Token")

}

app.all('/data/2.5/weather/', get_weather)

app.listen(port,() => {
  console.log(`Weather API listening on port ${port}`)
})

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) { //client → your server的 GET request和对应的respond
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
  const query = req.body.cityName; //req.body.The Name Attribute of The Input
  const apiKey = "72cb36fa1bc1a09f9d474ee74954ad61";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response) { //get the data from API as JDON format (https means the url in the parenthesis)
    console.log(response.statusCode);
    response.on("data", function(data) { //take the data from API
      const weatherData = JSON.parse(data); //parse the data into JSON format, then we can use it in JS
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<h1>The weather description in " + query + " is " + weatherDescription + ".<h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    })
  })
})






app.listen(3000, function() { //check if your server works
  console.log("Server is running on port 3000.");
});

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
    const query = req.body.cityName;
    const apikey = "6c840c973c60f93764e48ab440fb4f7e#";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units="+ unit + "&appid=" + apikey;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherdata = JSON.parse(data)
            const weatherdescription = weatherdata.weather[0].description
            const temp = weatherdata.main.temp;
            const url = weatherdata.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + url + "@2x.png";
            res.write("<p>The weather description is " + weatherdescription + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degree celsius</h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        })
    })
})

app.listen(3000,function(){
    console.log("the server is running on 3000");
})
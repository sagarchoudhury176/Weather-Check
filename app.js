const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req,res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req,res) {

    const query = req.body.name;
    const apiKey = "3bb681ae1512e0a05722b1d5a749a7f7";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=" + apiKey;

    https.get(url, function (response) {

        response.on("data",function (data) {
            const wdata = JSON.parse(data);
            const temp = wdata.main.temp;
            const des = wdata.weather[0].description;
            const icon = wdata.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>The temperature in "+query+" is " + temp + " degrees Celcisus</h1>");
            res.write("<p>The weather is currently " + des + "</p>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
});

app.listen(3000,function () {
    console.log("Server is running on port 3000.")
});
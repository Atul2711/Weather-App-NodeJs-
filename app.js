const bodyParser = require('body-parser');
const express=require('express');
const https=require('https');
require('dotenv').config();


const app=express();
app.use(bodyParser.urlencoded({extended:true}));
// app.use('view-engine', 'ejs');
app.set('view engine', 'ejs');
app.use(express.static("public"));







let city="Your City";
let temp="0";
let weatherDescription="clear";
let pressure="";
let humidity="";
let visibility="";
let speed="";
let deg="";
let imgURL="http://openweathermap.org/img/wn/10d@2x.png";
let year=new Date().getFullYear();


app.get('/',function(req,res){
    // res.sendFile(__dirname+"/index.html");

    res.render("index",{city:city,temp:temp,weatherDescription:weatherDescription,pressure:pressure,humidity:humidity,visibility:visibility,speed:speed,deg:deg,imgURL:imgURL,year:year});
       
    
});

app.post('/',function(req,res){
    // console.log("Post received");
    const City=req.body.cityName;
    const units="metric";

    const appid=process.env.API;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+City+"&units="+units+"&appid="+appid+"&mode=json";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on('data',function(data){
            // console.log(data);
            const weatherData=JSON.parse(data);
            console.log(weatherData);
            // JSON.stringify can be used to convert into 1D
            temp=weatherData.main.temp;
            weatherDescription=weatherData.weather[0].description;
            city=weatherData.name;
            pressure=weatherData.main.pressure;
            humidity=weatherData.main.humidity;
            visibility=weatherData.visibility;
            speed=weatherData.wind.speed;
            deg=weatherData.wind.deg;
            const icon=weatherData.weather[0].icon;
            
            imgURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";   
            // console.log(temp);
            // console.log(weatherDescription);
            // console.log(city);
            // console.log(icon);
            // res.send("The temperature in "+city+" is "+temp+" Degrees"+" and the cloud is "+weatherDescription+".");
            // res.write("The temperature in "+city+" is "+temp+" Degrees.");
            // res.write("The cloud is "+weatherDescription+". ");
            //res.write(<img src="+imageURL+"></img>);
            // res.send();
            res.render("index",{city:city,temp:temp,weatherDescription:weatherDescription,pressure:pressure,humidity:humidity,visibility:visibility,speed:speed,deg:deg,imgURL:imgURL,year:year});
        })//gives hexadecimal code without JSON.parse
    })
    // res.sendFile(__dirname+'/index.html'); we can have only one res.send but we can have multiple res.write
    // res.send("Server is up");
    
})




app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running to port 3000");
});

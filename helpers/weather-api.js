/* 
this file will create a weather factory, from which I can initialize a current weather object. 
The factory conains a function to collect information on the current weather conditions
of the location specified in itself.


*/



const fetch = require('node-fetch');
require('isomorphic-fetch');
require('dotenv').config(); 
 const API_KEY = process.env.API_KEY;


function Weather(temp, sky, location, lat, lon, theme){
    this.temp = temp;
    this.sky = sky;
    this.location = location;
    this.lat = lat;
    this.lon = lon;
    this.theme = theme;
  };

  const getWeather = (req,res,next) => {
    console.log(`checking lat ${req.body.lat} and long ${req.body.long} for weather`)
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.long}&units=metric&appid=${API_KEY}`)
    .then((response) => {
      return response.json();
    }).then(jsonRes => { 
        let theme = 'winter';
        if (jsonRes.main.temp > 25){
          theme = 'summer';
        }
         res.currentWeather = new Weather (
          jsonRes.main.temp,jsonRes.weather[0].main,
          jsonRes.name+", "+jsonRes.sys.country, req.body.lat,req.body.long,theme); //idk if lat and lon work
        console.log(res.currentWeather);
        next();      
      }).catch(err => {
        console.log(err);
      })
      console.log('API function is bringing your forecast');
  }

module.exports = getWeather;
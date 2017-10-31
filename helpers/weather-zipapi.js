function Weather(temp, sky, location, lat, lon, theme){
  this.Temp = temp;
  this.sky = sky;
  this.location = location;
  this.lat = lat;
  this.lon = lon;
  this.theme = theme;
};

const fetch = require('node-fetch');
require('isomorphic-fetch');
require('dotenv').config(); 
 const API_KEY = process.env.API_KEY;


const getWeather = (req,res,next) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${req.body.zipcode},us&units=metric&appid=${API_KEY}`)
  .then( response => {
    return response.json();
  }).then(jsonRes => {
    let theme = 'winter';
    if (jsonRes.main.temp > 25){
      theme = 'summer';
    }
    res.currentWeather = new Weather (
      jsonRes.main.temp,jsonRes.weather[0].main,
      jsonRes.name+", "+jsonRes.sys.country, jsonRes.coord.lat,jsonRes.coord.lon,theme); //idk if lat and lon work
      console.log(res.currentWeather); 
      next();     
  }).catch(err => {
    console.log(err);
  })
  console.log(`API function for zipcode is bringing your forecast ${req.body.zipcode}`);
}

module.exports = getWeather;







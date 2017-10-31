const express = require('express');


const viewsController = {};

viewsController.profile = (req,res) => {
  console.log('views controller loading profile')
  res.render('weather/profile', {
    locations: locationList
  });
}

viewsController.choose = (req, res) => {
  console.log('You have reached the views controller. greetings');  
  console.log(res.currentWeather.theme); 
  console.log(res.currentWeather)
  switch(res.currentWeather.theme) {
    case 'summer':
    console.log(`apparently it's summer`);    
    res.render('weather/summer', {
      title: 'summer',
      stats: res.currentWeather
    }); /* weather/summer */
    break;
    
    case 'winter':
    res.render('weather/winter', {
      title: 'winter',
      stats: res.currentWeather
    }); /* weather/winter */
    break;
  }
}

viewsController.winter = (req, res) => {
  res.render('weather/winter');
}

viewsController.summer = (req, res) => {
  res.render('weather/summer', {
    title:'summer page'
  });
}

module.exports = viewsController;
const express = require('express');
const locationController = require('../controllers/location-controller');
const weatherRouter = express.Router();
const forecast = require('../helpers/weather-api');
const forecastByZip = require('../helpers/weather-zipapi');
const authHelpers = require('../helpers/auth/auth-helpers');
const usersController = require('../controllers/users-controller');

const viewsController = require('../controllers/view-controller');

console.log('routes says hi');

/* weatherRouter.get('/', weatherController.index) */
//weatherRouter.get('/', weatherController.summer) 

//guest path
weatherRouter.post('/searchauto', forecast ,locationController.addLocation,viewsController.choose)
weatherRouter.post('/searchzip', forecastByZip ,locationController.addLocation,viewsController.choose)


weatherRouter.get('/profile', authHelpers.loginRequired, usersController.listLocations, viewsController.profile)
//for testing
weatherRouter.get('/winter', viewsController.winter) 
weatherRouter.get('/summer', viewsController.summer) 
module.exports = weatherRouter;

//stuff to use db and users for tasks, saved locations, 


/*  guest path description

    take location information, find weather conditions - stored in res.currentWeather object
    check if location exists in db. if not, --think of this as the db controller
    store location name in database
-->    find information relevant to location
    send to viewscontroller
    send views
*/
console.log('You are in Auth Routes');
const express = require('express');
const authRouter = express.Router();
const passport = require('../helpers/auth/local');
const authHelpers = require('../helpers/auth/auth-helpers');
const usersController = require('../controllers/users-controller');
const forecastByZip = require('../helpers/weather-zipapi');
const locationController = require('../controllers/location-controller');
const viewsController = require('../controllers/view-controller');

// TODO: create forecast by zipcode variation.
authRouter.post('/searchzip', forecastByZip ,locationController.addLocation, usersController.addUsersLocation, usersController.listLocations)
/* authRouter.delete('/:id',) */
authRouter.get('/login', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/login');
});

authRouter.get('/register', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/register');
});
//req.body.
authRouter.delete('/:id', authHelpers.loginRequired, usersController.removeUsersLocation, usersController.listLocations)
authRouter.post('/register', usersController.create);

authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/weather/profile',
    failureRedirect: '/auth/login',
    failureFlash: false //just install something
  })
);
authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = authRouter;
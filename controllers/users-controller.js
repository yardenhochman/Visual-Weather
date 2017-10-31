const bcrypt = require('bcryptjs');
const User = require('../models/users.js');
const locationController = require('../controllers/location-controller');
const forecast = require('../helpers/weather-api');
const Locations = require('../models/locations.js');

const usersController = {};


usersController.create = (req, res,next) => {
  console.log('this is the users model in create',usersController)
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    username: req.body.username,
    email: req.body.email, 
    password_digest: hash,
  }).then( user => {
    console.log( '------->',user.id)
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect('/auth/register');
    });
  }).catch( err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}
  
  
 /*  User.checkNewUser({
    username: req.body.username,
    email: req.body.email,
  }).then( number => {
    console.log(`This is the number of occurences of the username: ${number.count}`);
    if (number.count == 0){
      User.create({
        username: req.body.username,
        email: req.body.email,
        password_digest: hash,
      })
      .then( () => {
        res.redirect('/auth/login');
      }) 
    }
    else {
      console.log(`user/email already exists`)
      res.redirect('/auth/login');
      }
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });

} */
usersController.listLocations = (req, res) => {
  Locations.UserLocations(req.user.name)  
  .then( locationList => {
    res.render('weather/profile', {
      locationList:locationList,
    })
/* 
    next, make a helper function that iterates over the location list
    view controller
 */
    /* 
    receives a list of locations, 
    uses the api to check the weather for each one, 
    and stores the results in each location object's 
    weather property
     
    */
/*     next(); */
  })
  .catch (err => {
    console.log('error on the listLocations on users controller')
    next(err);
  })
}
usersController.addUsersLocation = (req, res , next) => {
  console.log('you are in add users location', req.locationid)
  User.addLocation(req.user.id,req.locationid)
  .then( () => {
    next();
  })
  .catch (err => {
    console.log('error on the listLocations on users controller')
    next(err);
  })
}

usersController.removeUsersLocation = (req, res, next) => {
  console.log('we have reached removeuserslocation in the users controller')
  Locations.findIdByName(req.params.id)
  .then( id => {
    User.removeLocation(req.user.id,id.id)
    .then( () => {
      next();
    })
  })
  .catch (err => {
    console.log('error on the listLocations on users controller')
    next(err);
  })
}


module.exports = usersController;
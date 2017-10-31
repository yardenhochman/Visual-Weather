const Locations = require('../models/locations');
const Users = require('../models/users');

const locationController = {};


locationController.addLocation = (req,res,next) => {
  console.log('controllor location #1');
  
  Locations.countByName(res.currentWeather.location)
    .then(location => {
      if (location.count == 0){
        console.log('location was not found in db. adding');    
        console.log(req)    
        Locations.add(res.currentWeather)
          .then(location => {
            console.log(`this is the data we get back on location controller when it's adding ${location.id}`)
            req.locationid=location.id;
            next();
          })
          .catch(err => {
            next(err);
          })
      } else {
        console.log(`location was found in db. retreiving data`)                       
        console.log(`---->`,location)
        Locations.findIdByName(res.currentWeather.location)
        .then( (location) => {
          console.log(`this is the data we get back on location controller ${location.id}`)
          req.locationid=location.id;
          /* console.log(location) */
          next();
        })
      }
    })
  .catch(err => {
    next(err);
  })
}

//not in use yet

/* 
locationController.show = (req,res) => {
  Locations.findByProperties(id);
}

locationController.summer = (req,res) => { 
  location.findSummer()
  .then(location => {
    res.render('/summer', {
      message: 'ok',
      location: location })
  })
  .catch(err => {
    console.log(err)
    res.status(400).json(err);
  });
}

locationController.winter = (req,res) => {
  location.findWinter()
  .then(location => {
    res.render('/winter', {
      message: 'ok',
      location: location })
  })
}
locationController.checklocation = (req,res,next) => {

  .then(currentlocation => {
  switch(currentlocation.temp) {
    case(currentlocation.temp > 70): {
      res.render('/summer', {
        message: 'ok',
        location: location })
      break;
    }
    default: {
      res.render('/winter', {
        message: 'ok',
        location: location })
        break;
    }
  }
})
} */
module.exports = locationController;
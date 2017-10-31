const passport = require('passport');
const Users = require('../../models/users');


module.exports = () => {
    passport.serializeUser((users, done) => {
      console.log("hello from the passport " , users.name)
      done(null, users.name);
    });
  
    passport.deserializeUser((username, done) => {
      Users.findByUserName(username)
        .then(users => {
          done(null, users);
        }).catch(err => {
          done(err, null);
        });
    });
  };
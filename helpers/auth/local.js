console.log('you are now in local');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const init = require('./passport');
const User = require('../../models/users');
const authHelpers = require('./auth-helpers');
const options = {};

init();

passport.use(
  new LocalStrategy(options, (username, password, done) => {
    User.findByUserName(username)
      .then(user => {
        if (!user) {
          console.log('not user')
          return done(null, false);
        }
        if (!authHelpers.comparePass(password, user.password_digest)) {
          console.log('wrong password')
          return done(null, false);
        } else {
          console.log('correct!!!!111 on passport local file')
          return done(null, user);
        }
      }).catch(err => {
        console.log(err);
        return done(err);
      });
  })
);

module.exports = passport;
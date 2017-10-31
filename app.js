
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const authHelpers = require('./helpers/auth/auth-helpers');
const logger = require('morgan');
const methodOverride = require('method-override');

const Users = require('./models/users.js');

const authRouter = require('./routes/auth-routes');
const weatherRouter = require('./routes/weather-routes');

app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(bodyParser.json()) //
app.use(bodyParser.urlencoded({ extended: false }))

/* passport.serializeUser((users, done) => {
  done(null, users.username);
});
//have the logic here instead of in the passport file so it's accessable across the application
passport.deserializeUser((username, done) => {
  Users.findByUserName(username)
    .then(users => {
      done(null, users);
    }).catch(err => {
      done(err, null);
    });
}); */
/// see notes above 
app.use(express.static('public'));
app.use('/auth', authRouter);
app.use('/weather',weatherRouter)
app.get('/', (req, res) => {
  res.render('index');

/* app.use(authHelpers.loginRequired)
 */
  //renders a view path to render (relative to the views settins above). will search for extension based on
  //the view engine determined. EJS in this case
  //and sends the rendered HTML string to the client.
  //other parameters: locals - an object who's properties will be local to the view,
  //callback - for errors
});
//breakdown: "path" path where middleware is invoked, "callback" function or series of functions to use. 
//if a path is not specified, it defaults to the root
app.listen(PORT, () => {
  console.log(`App is up and running. Listening on port ${PORT}`);
});

/* 
app sends the user to the index page when getting a 
request to its root directory. if there's a request
to anything inside the directories weather or 
profile, app will send the request forward to weather router

index:

index offers the user three usage cases
enter a location manually
find the user's location automatically,
or go to profile page to see predefined locations' 
weather situation.

Once the user shares his location, the function
sends a post request via the form which due to being
under "weather" is sent to the router. The router
starts a chain of middleware functions that 
identify the weather in this location, add it to the 
database if it's not already on it, and send forward 
a view based on the weather.

if the user chooses to go to the profile page (login)
and is not logged in yet, he will be redirected to the 
login page



*/

app.get('*',(req,res)=>{
  res.status(404).send('this route aint here')
});
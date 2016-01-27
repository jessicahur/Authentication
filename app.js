'use strict';

const router = require('./lib/router');
const employeeRouter = require('./lib/employeeRouter');

const ensureAuthenticated = require('./lib/ensureAuthenticated');

const express = require('express');
const path = require('path');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

//passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./model/User');

//view engine (http://expressjs.com/en/guide/using-template-engines.html)
app.set('view engine', 'jade'); //After the view engine is set, you don’t have to specify the engine or load the template engine module in your app; Express loads the module internally. If the view engine property is not set, you must specify the extension of the view file. Otherwise, you can omit it.
//express view engine is defaulted to read templates from 'views' folder, not public

//environment setups
app.use(bodyParser.json());

app.use(session({
  secret: 'my first cookie ever',
  name: 'employee',
  resave: false,
  saveUninitialized: false
}));//create session middleware w/the given options

app.use(passport.initialize()); //passport.initialize() middleware is required to initialize Passport. If your application uses persistent login sessions, passport.session() middleware must also be used.
app.use(passport.session());

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));//helps with parsing form data to get req.body.username and req.body.password

//Link passport with Schema
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Mount router to app
app.use('/', router);
app.use('/employees', ensureAuthenticated, employeeRouter);
app.use(ensureAuthenticated, express.static(path.join(__dirname, 'employeeView'))); //employee list can only be accessed by authenticated user

//404
app.use((req, res, next) => {
  res.sendStatus(404);
});

module.exports = app;


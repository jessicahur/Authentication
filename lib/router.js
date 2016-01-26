'use strict';

//express
const express = require('express');
// const url = require('url');

//passport
const passport = require('passport');

//database
const mongoose = require('mongoose');
const User = require('../model/User');

const router = express.Router();


//GET Home
router.get('/', (req, res, next) => {
  res.render('index', {user: req.user});
});

//register (links on homepage)
router.get('/register', (req, res, next) => {
  res.render('register', {});
});

router.post('/register', (req, res, next) => {
  User.register(new User({
    username: req.body.username
  }), req.body.password, (err, user) => {
    if (err) {
      return res.render('register', {message: `Username ${req.body.username} is not available`}); //Check this
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });
  });
});

//login (links on homepage)
//http://passportjs.org/docs/username-password
router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}));

router.get('/login', (req, res) => {
  res.render('login', {user: req.user});
});

//logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
module.exports = router;

'use strict';

//express
const express = require('express');
const url = require('url');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
//passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//database
const mongoose = require('mongoose');

const router = express.Router();

router.use(bodyParser.json());

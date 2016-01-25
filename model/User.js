'use strict';

const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  username: String,
  password: String,
  isAdmin: Boolean
});

User.plugin(passportLocalMongoose); //takes care of salt, hash, etc.

module.exports = mongoose.model('User', User);

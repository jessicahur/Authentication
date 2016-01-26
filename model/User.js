'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    require: true
  },
  isAdmin: Boolean
});

User.plugin(passportLocalMongoose); //takes care of registering process with salt, hash, etc.

module.exports = mongoose.model('User', User);

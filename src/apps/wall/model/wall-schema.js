'use strict';

const mongoose = require('mongoose');

const wall = mongoose.Schema({
  ownerId: {type: String},
  unixTime: {type: Number},
  text:{type: String},
});

module.exports = mongoose.model('wall', wall);

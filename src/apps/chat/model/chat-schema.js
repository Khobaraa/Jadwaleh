'use strict';

const mongoose = require('mongoose');

const chat = mongoose.Schema({
  username: {type: String},
  room: {type: String , enum: ['math', 'physics','history','arabic']},
  time: {type: String},
  unixTime: {type: Number},
  text:{type: String},
});

module.exports = mongoose.model('chat', chat);

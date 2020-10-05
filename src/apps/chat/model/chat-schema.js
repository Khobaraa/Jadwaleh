'use strict';

const mongoose = require('mongoose');

const chat = mongoose.Schema({
  userID: {type: String, unique: true},
  room: {type: String , enum: ['math', 'physics','history','arabic']},
  time: {type: String},
  message:{type: String},
});

module.exports = mongoose.model('chat', chat);

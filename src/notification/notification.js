'use strict';

const mongoose = require('mongoose');

const Notification = mongoose.Schema({
  text: { type: String, required: true },
  time:{type : Date, default: Date.now },
  student_id: { type: String, required: true },
});


module.exports = mongoose.model('Notification', Notification);
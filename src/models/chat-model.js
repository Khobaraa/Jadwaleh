'use strict';

const mongoose = require('mongoose');
const Model = require('../mongo.js');

const schema = mongoose.model('chat', {
  username: {type: String},
  room: {type: String , enum: ['math', 'physics','history','arabic']},
  time: {type: String},
  unixTime: {type: Number},
  text:{type: String},
});

class Chat extends Model {
  constructor() {
    super(schema);
  }

  create(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  get(record) {
    if (typeof record === 'object') {
      return this.schema.find(record);
    } else {
      return this.schema.find({});
    }
  }

  getNumberOfLastMessagesByRoom(room,number){
    return this.schema.find(room).sort({ unixTime: 'desc'}).limit(number);
  }
}

module.exports = new Chat;

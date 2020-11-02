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

  get(room, number){
    return super.get(room).sort({ unixTime: 'desc'}).limit(number);
  }

  //   update(_id, record) {
  //     return this.schema.findByIdAndUpdate(_id, record);

  //   delete(_id) {
  //     return this.schema.findByIdAndDelete(_id);
  //   }
}

module.exports = new Chat;

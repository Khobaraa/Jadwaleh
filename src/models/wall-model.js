'use strict';

const mongoose = require('mongoose');
const Model = require('../mongo.js');

const schema = mongoose.model('wall', {
  ownerId: {type: String},
  unixTime: {type: Number},
  text:{type: String},
});

class Wall extends Model {
  constructor() {
    super(schema);
  }

  get(ownerId) {
    console.log('reading ownerId', ownerId);
    return ownerId ? this.schema.find({ownerId}) : this.schema.find({});
  }
  // getNumberOfLastMessagesByRoom(room,number){
  //   return this.schema.find(room).sort({ unixTime: 'desc'}).limit(number);
  // }

  //   update(_id, record) {
  //     return this.schema.findByIdAndUpdate(_id, record);
}

module.exports = new Wall;

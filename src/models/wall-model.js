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

  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = new Wall;

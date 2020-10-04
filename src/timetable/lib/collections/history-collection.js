'use strict';
// require the schema and move all notes crud operations
const mongoose = require('mongoose');
const Model = require('../mongo.js');

const schema = mongoose.model('history', {
  name: {type: String, require: true},
  subjects: [
    {
      name: {type: String},
      expectedHours: {type: Number, default: 200},
      units: [
        {
          number: {type: Number},
          chapters: [Number],
          completed: {type: Number, default: 0}
        },
      ]
    },
  ]
});

class History extends Model{
  constructor() {
    super(schema);
  }

}

module.exports = new History;
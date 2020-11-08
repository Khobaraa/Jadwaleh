'use strict';
// require the schema and move all notes crud operations
const mongoose = require('mongoose');
const Model = require('../mongo.js');

const schema = mongoose.model('table', {
  ownerId: {type: String},
  day: [
    {
      date: {type: Number},
      topics: [
        {
          name: {type: String, default: 0},
          hours: {type: Number, default: 0}, // for future 
          completed: {type: Number, default: 0}, // 0-1
        },
      ],
    },
  ],
});

class Table extends Model {
  constructor() {
    super(schema);
  }

}

module.exports = new Table;
'use strict';
// require the schema and move all notes crud operations
const mongoose = require('mongoose');
const Model = require('../mongo.js');

const schema = mongoose.model('table', {
  week: [
    {
      number: {type: String, require: true},
      totalHoursWeek: {type: Number, default: 0},
      day: [
        {
          number: {type: Number},
          topics: [
            {
              name: {type: String, default: 0},
              totalHours: {type: Number, default: 0},
              completed: {type: Number, default: 0},
            }
          ],
          totalHoursDay: {type: Number, default: 0}
        },
      ]
    },
  ]
});

class Table extends Model{
  constructor() {
    super(schema);
  }

}

module.exports = new Table;
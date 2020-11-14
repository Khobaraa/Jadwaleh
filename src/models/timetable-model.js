'use strict';
// require the schema and move all notes crud operations
const mongoose = require('mongoose');
const Model = require('../mongo.js');

const schema = mongoose.model('table', {
  ownerId: {type: String},
  date: {type: Date},       // day of the year
  lessonId: {type: String, default: 0}, // number of the topic
  lesson:{type: String, default: 'N/A'},
  time: {type: Number, default: 0}, // time spent 
  completed: {type: Number, default: 0}, // 0-1
});

class Table extends Model {
  constructor() {
    super(schema);
  }
  
  get(ownerId) {
    console.log('reading ownerId for timetable', ownerId);
    return ownerId ? this.schema.find({ownerId}) : this.schema.find({});
  }
}

module.exports = new Table;
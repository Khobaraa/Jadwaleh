'use strict';
// require the schema and move all notes crud operations
const mongoose = require('mongoose');
const Model = require('../mongo.js');

const schema = mongoose.model('history', {
  name: {
    type: String, required: true, /*enum: ['Scientific Stream', 'Literary Stream', 'Industrial Stream'],*/
  },
  courses: [
    {
      name: { type: String },
      expectedHours: { type: Number },
      noOfChapters: { type: Number },
      chapters: [
        {
          name: { type: String },
          duration: { type: Number },
          state: { type: String, required: true, enum: ['not-studied', 'in-progress', 'completed'] },
        },
      ],
      isCompleted: { type: Boolean },
    },
  ],
  student_id: { type: String, required: true },
});

class History extends Model{
  constructor() {
    super(schema);
  }

}

module.exports = new History;
'use strict';

const mongoose = require('mongoose');
const Model = require('../mongo.js');

const schema = mongoose.model('history', {
  name: {type: String, require: true},
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
  student_id: { type: String, required: true, unique: true, sparse: true},
});

class History extends Model {
  constructor() {
    super(schema);
  }

  get(student_id) {
    console.log('reading studemt_id', student_id);
    return this.schema.find({student_id});
  }
}

module.exports = new History;
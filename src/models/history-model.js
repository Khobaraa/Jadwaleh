'use strict';

const mongoose = require('mongoose');
const Model = require('../mongo.js');

const schema = mongoose.model('histories', {
  startDate: {type: String},
  name: {type: String, require: true},
  description: {type: String},
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
  day: [
    {
      date: {type: Number},
      topics: [
        {
          name: {type: String, default: 0},
          totalHours: {type: Number, default: 0}, // for future 
          completed: {type: Number, default: 0}, // 0-1
        },
      ],
    },
  ],
});

class History extends Model {
  constructor() {
    super(schema);
  }

  get(student_id) {
    console.log('reading student_id', student_id);
    return student_id ? this.schema.find({student_id}) : this.schema.find({});
  }

  put(student_id) {
    return student_id ? this.schema.findOneAndUpdate({student_id}) : this.schema.find({});
  }

  delete(student_id) {
    return student_id ? this.schema.findOneAndRemove({student_id}) : Promise.reject();
  }
}

module.exports = new History;
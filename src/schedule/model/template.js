'use strict';

const mongoose = require('mongoose');

const Template = mongoose.Schema({
  name: {
    type: String, required: true, enum: ['Scientific Stream', 'Literary Stream', 'Industrial Stream'],
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
          date : {type: Date},
          state: { type: String, required: true, enum: ['not-studied', 'in-progress', 'completed'] },
        },
      ],
      isCompleted: { type: Boolean },
    },
  ],
  student_id: { type: String, required: true },
});


module.exports = mongoose.model('Template', Template);
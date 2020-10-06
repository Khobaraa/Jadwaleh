'use strict';
// require the schema and move all notes crud operations
const mongoose = require('mongoose');
const Model = require('../mongoTable.js');

const schema = mongoose.model('history', {
  name: {type: String, require: true},
  userId: {type:String},
  subjects: [

    {
      name: { type: String },
      expectedHours: { type: Number },
      noOfChapters: { type: Number },
      chapters: [
        {
          name: { type: String },
          duration: { type: Number },
          state: { type: Number, required: true},
        },
      ],
      isCompleted: { type: Boolean },
    },
  ],
  student_id: { type: String, required: true, unique: true, sparse: true},
});

class History extends Model{
  constructor() {
    super(schema);
  }

}

module.exports = new History;
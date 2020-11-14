'use strict';
// require the schema and move all notes crud operations
const mongoose = require('mongoose');
const Model = require('../mongo.js');

const schema = mongoose.model('template', {
  createdDate: {type: String},
  name: {
    type: String, required: true,
  },
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
  ownerId: { type: String, required: true},
});

class Template extends Model {
  constructor() {
    super(schema);
  }

  
  get(_id) {
    console.log('reading _id', _id);
    let template = _id ? this.schema.find({_id}) : this.schema.find({});
    return template;
  }
}

module.exports = new Template;

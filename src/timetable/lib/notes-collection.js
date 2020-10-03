'use strict';
// require the schema and move all notes crud operations
const mongoose = require('mongoose');

const schema = mongoose.Schema({
  Text: {type: String, require: true},
  Category: {type: String}
})


class NotesDB {
  constructor() {}
  
  save(obj) {
    let newRecord = new schema({
      Text: obj.Text,
      Category: obj.Category
    });
    return newRecord.save();
  }

  get(_id) {
    return _id ? schema.findById({_id}) : schema.find();
  }

  deleteOne(_id) {
    return schema.findByIdAndDelete({_id});
  }

  deleteBunch(category) {
    return schema.deleteMany(category);
  }

  updateOne(obj) {
    return schema.findByIdAndUpdate(obj.updateID, {Text: obj.update.Text, Category: obj.update.Category});
  }
}

module.exports = new NotesDB;
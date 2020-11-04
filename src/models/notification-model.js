'use strict';

const mongoose = require('mongoose');
const Model = require('../mongo.js');

const schema = mongoose.model('notification', {
  text: { type: String, required: true },
  time:{type : Date, default: Date.now },
  student_id: { type: String, required: true },
  importance: {type: Number},
});

class Notification extends Model {
  constructor() {
    super(schema);
  }

  get(student_id) {
    console.log('reading student_id', student_id);
    return student_id ? this.schema.find({student_id}) : this.schema.find({});
  }
}
// getNumberOfLastMessagesByRoom(room,number){
//   return this.schema.find(room).sort({ unixTime: 'desc'}).limit(number);
// }

//   update(_id, record) {
//     return this.schema.findByIdAndUpdate(_id, record);



module.exports = new Notification;

'use strict';

const mongoose = require('mongoose');

const Course = mongoose.Schema({
  name: { type: String, required: true },
  chapters_no: { type: Number , required: true },
  completed: { type: String },
});
  
Course.methods.getStatistics  = function(){
  return (this.completed / this.chapters_no) * 100;
};

Course.statics.list = async function () {
  let courses = await this.find({});
  let stat, statArr = [];
  if(courses){
    courses.forEach(course => {
      stat = {
        name : course.name,
        progress : course.getStatistics(),
      };
      statArr.push(stat);
    });
  }
  return statArr;
};

module.exports = mongoose.model('Course', Course);
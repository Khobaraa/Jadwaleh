'use strict';

const events = require('../modules/events');
const statistics = require('../modules/statistics');

//To get the progress and other statistics
async function getDashboard(id){
  try{
    let courses = await statistics(id);
    if(courses){
      let total =0 , progress = 0;
      courses.forEach( course => {
        total += course.progress;
      });
      progress = total/ courses.length;
      setTimeout(() => { 
        events.emit('summary',id, progress );
      }, 1000);
      return courses;
    }
  } catch(e){
    return e;
  }
}

module.exports = getDashboard;
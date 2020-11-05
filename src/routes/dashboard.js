'use strict';

const events = require('../modules/events');
const statistics = require('../modules/statistics');

//To get the progress and other statistics
async function getDashboard(req){
  try{
    let courses = await statistics(req.cookies.userId);
    if(courses){
      let total =0 , progress = 0;
      courses.forEach( course => {
        total += course.progress;
      });
      progress = total/ courses.length;
      setTimeout(() => { 
        events.emit('summary',req.cookies.userId, progress );
      }, 5000);
      return courses;
    }
  } catch(e){
    return e;
  }
}

module.exports = getDashboard;
'use strict';

const history = require('../models/history-model');

module.exports = async function (userId) {
  let data = await history.get(userId);
  let statArr = [];
  try {
    data = data[0].toObject();

    data.courses.forEach(course => {
      let result = statistics(course);
      statArr.push(result);
      
    });
    return statArr;
  } catch(e) {
    throw new Error('You have not started studying yet!');
  }
};

function statistics (course) {
  let result ={}, total = 0 , hours = 0;
  result['name'] = course.name;
  result['hours'] = course.expectedHours;
  course.chapters.forEach(chapter => {
      
    if(chapter.state === 'completed'){
      total++;
      hours += Math.floor(chapter.duration*50*Math.random()); // numbers randomizer
    }
    result['spentHours'] = hours;
    result['progress'] = Math.floor(total/ course.noOfChapters * 100);

  });
  return result;
}

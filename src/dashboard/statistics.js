'use strict';

const history = require('./history-collection');

module.exports = async function (userId) {
  let data = await history.read(userId);
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
      
    if(chapter.state ===1){
      total++;
      hours += chapter.duration;
    }
    result['spentHours'] = hours;
    result['progress'] = Math.floor(total/ course.noOfChapters * 100);

  });
  return result;
}

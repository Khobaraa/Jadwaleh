'use strict';

const template = require('../schedule/model/template');

module.exports = async function (id) {
  let data = await template.findOne({student_id :id});
  let statArr = [];
  if(data){
    data.courses.forEach(course => {
      let result = statistics(course);
      statArr.push(result);
      
    });
  } 
  return statArr;

};

function statistics (course) {
  let result ={}, total = 0 , hours = 0;
  result['name'] = course.name;
  result['hours'] = course.expectedHours;
  course.chapters.forEach(chapter => {
      
    if(chapter.state === 'completed'){
      total++;
      hours += chapter.duration;
    }
    result['spentHours'] = hours;
    result['progress'] = Math.floor(total/ course.noOfChapters * 100);

  });
  return result;
}

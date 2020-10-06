'use strict';

const express = require('express');
const router = express.Router();
const events = require('../notification/events');
const statistics = require('../dashboard/statistics');
const bearerAuth = require('../auth/middleware/bearer');

router.get('/dashboard', bearerAuth, getDashboard);

async function getDashboard(req,res,next){
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
      // res.render('dashboard', {courses:courses});
      res.send(courses);
    }
    
  } catch(e){
    next(e);
  }
  
}

// const test = require('../schedule/model/dummydata');
// router.get('/schedule', savedummy);
// async function savedummy(){
//   test();
// }

module.exports = router;
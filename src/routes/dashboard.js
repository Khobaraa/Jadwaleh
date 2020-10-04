'use strict';

const express = require('express');
const router = express.Router();
const statistics = require('../dashboard/model/statistics');

router.get('/dashboard', getDashboard);

async function getDashboard(req,res,next){
  try{
    let courses = await statistics();
    res.render('dashboard', {courses:courses});
    // res.send(courses);
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
'use strict';

// course : id, chapters [], completed

const express = require('express');
const router = express.Router();
const Course = require('../dashboard/model/course_model');

router.get('/dashboard', getDashboard);

async function getDashboard(req,res,next){
  try{
    let courses = await Course.list();
    res.send(courses);
  } catch(e){
    next(e);
  }
  
}

module.exports = router;
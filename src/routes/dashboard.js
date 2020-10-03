'use strict';

// course : id, chapters [], completed

const express = require('express');
const router = express.Router();
const Course = require('../dashboard/model/course_model');

router.get('/dashboard', getDashboard);

async function getDashboard(req,res,next){
  let courses = await Course.list();
  res.send(courses);
}

module.exports = router;
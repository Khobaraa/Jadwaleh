'use strict';

const express = require('express');
const router = express.Router();
const template = require('../schedule/model/template');

router.get('/courses', getCourses);
router.put('/course/:id', updatestate);
router.put('/chapter/:id', updateProgress);

async function getCourses(req, res, next) {
  try {
    let data = await template.findOne({ student_id: '5f79cd4995eecc07d8a37dfa' });
    res.send(data.courses);
  } catch (e) {
    next(e);
  }
}

async function updatestate(req, res, next) {
  try {
    let courseId = req.params.id;
    await template.findOneAndUpdate({ _id: courseId }, { isCompleted: true });
  } catch (e) {
    next(e);
  }
}

async function updateProgress(req, res, next) {
  try {
    let chapterId = req.params.id;
    await template.findOneAndUpdate({ _id: chapterId }, { state: 'completed' });
  } catch (e) {
    next(e);
  }
}


module.exports = router;
'use strict';

const express = require('express');
const router = express.Router();
const events = require('../notification/events');
const Notification = require('../notification/notification');
require('./auth-router');

let cookie;
events.on('signin', async data => {
  const notification = {
    text: 'Welcome back' ,
    time: new Date() ,
    student_id : data,
  };
  console.log('new notification: ',notification);
  await Notification.create(notification);
});


events.on('congrats', async data=> {
  const notification = {
    text: 'Great progress!! Keep it up' ,
    time: new Date() ,
    student_id : cookie,
  };
  await Notification.create(notification); 
});

events.on('summary', async (student, sum) => {
  const notification = {
    text: `You have made ${sum} progress`,
    time: new Date(),
    student_id : student,
  };
  console.log('new notification: ',notification);
  await Notification.create(notification); 

});

events.on('reminder', async (student, reminder) => {
  //when will the use get this notification?
  const notification = {
    text: 'Hey, Are you there?! We think you might be beyond schedule',
    time: new Date() ,
    student_id : student,
  };
  await Notification.create(notification); 
});

events.on('wall-change', post => console.log('Someone wrote on your wall', post));
events.on('message', msg => console.log('You have new messages, ', msg));


router.get('/notifications', async (req,res,next) => {
  try {
    let data = await Notification.find({ student_id: req.cookies.userId });
    cookie =  req.cookies.userId;
    res.send(data);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

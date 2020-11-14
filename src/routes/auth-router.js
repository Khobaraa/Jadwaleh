'use strict';

const express = require('express');
const router = express.Router();
const session = require('express-session');

const usersModel = require('../models/users-model');
const basicAuth = require('../middleware/basic');
const oauth = require('../middleware/oauth');
const events = require('../modules/events');     // Emit signin notification.
// const header = require('./middleware/header');

router.post('/signup', postAuthDetails);
router.post('/signin', basicAuth, verifyAuthDetails);
router.get('/oauth', oauth, useOauthDetails);

router.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));

// ----------------------------------- Auth Function ----------------------------------- //
function postAuthDetails(req, res, next) {
  usersModel.create(req.body).then(user => {
    res.status(200).send(user);  
  }).catch(err=> {
    console.log(err);
    next(err);
  });
}

function useOauthDetails(req, res, next) {
  res.status(200).send(req.token);
}

function verifyAuthDetails(req, res, next) {
  if (req.token) {
    res.cookie('token',req.token);
    res.cookie('userId',`${req.user._id}`);
    events.emit('signin',req.user._id );
    res.status(200).send({
      token: req.token,
      user: req.user,
    });
  } else {
    res.status(401).send('User Does Not Exists!');
  }
}

module.exports = router;

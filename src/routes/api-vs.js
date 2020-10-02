'use strict';

const express = require('express');
const router = express.Router();

const getModel = require('../middleware/model-finder');
const usersModel = require('./auth/models/users-model');
const basicAuth = require('./auth/middleware/basic');
const bearerAuth = require('./auth/middleware/bearer');
const ouath = require('./auth/middleware/oauth');
const aclMiddleWare = require('./auth/middleware/acl-middleware');
// routes as MiddleWare
// generic model
router.post('/signup', postAuthDetails);
router.post('/signin', basicAuth, verifyAuthDetails);
router.get('/oauth', ouath, useOAuth);

router.get('/users/', bearerAuth, aclMiddleWare('read'), getUserDetails);
router.get('/users/:id', bearerAuth, aclMiddleWare('read'), getUserDetails);
router.put('/users/:id', bearerAuth, aclMiddleWare('update'), updateUserDetails);
router.delete('/users/:id', bearerAuth, aclMiddleWare('delete'), deleteUserDetails);

// get model
router.param('model', getModel);

// ----------------------------------- functions categories ----------------------------------- //
async function postAuthDetails(req, res, next) {
  usersModel.create(req.body).then(user => {
    res.status(200).send(user);  
  }).catch(err=> {
    console.log(err);
    next(err);
  });
}

function verifyAuthDetails(req, res, next) {
  if (req.token) {
    res.status(200).send({
      token: req.token,
      user: req.user,
    });
  } else {
    res.status(401).send('User Does Not Exists!');
  }
}

function useOAuth(req, res, next) {
  res.status(200).send(req.token);
}

function getUserDetails(req, res, next) {
  let id = req.params.id;
  usersModel.get(id).then(data => {
    let output = {
      count: 0,
      results: [],
    };

    output.count = data.length;
    output.results = data;
    res.status(200).json(output);
  }).catch(err=> {
    console.log(err);
    next(err);
  });
}

function updateUserDetails(req, res, next) {
  let id = req.params.id;
  usersModel.update(id).then(data => {
    res.status(200).json(data);
  }).catch(err=> {
    console.log(err);
    next(err);
  });
}

function deleteUserDetails(req, res, next) {
  let id = req.params.id;
  usersModel.delete(id).then(data => {
    res.status(200).json(data);
  }).catch(err=> {
    console.log(err);
    next(err);
  });
}

module.exports = router;
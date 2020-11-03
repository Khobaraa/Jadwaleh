'use strict';

const express = require('express');
const router = express.Router();
// const dashboard = require('./routes/dashboard');
// ----------------------------------- Special Routes ----------------------------------- //

const authRouter =  require('./routes/auth-router.js');
const serverErrorHandler = require('./middleware/500');
router.use(authRouter);
router.use(serverErrorHandler);

// ----------------------------------- Generic Routes ----------------------------------- //

const getModel = require('./middleware/model-finder');
router.param('model', getModel);

const bearerAuth = require('./middleware/bearer');
const aclMiddleWare = require('./middleware/acl-middleware');
router.get('/:model', bearerAuth, aclMiddleWare('read'), getItem);
router.get('/:model/:id', bearerAuth, aclMiddleWare('read'), getItem);
router.post('/:model', bearerAuth, aclMiddleWare('write'), postItem);
router.put('/:model/:id', bearerAuth, aclMiddleWare('update'), updateOneItem);
router.patch('/:model/:id', bearerAuth, aclMiddleWare('update'), updateOneItem);
router.delete('/:model/:id', bearerAuth, aclMiddleWare('delete'), deleteOneItem);


// ----------------------------------- Generic Functions ----------------------------------- //

function postItem(req, res, next) {
  console.log('in Post Item', req.body);

  req.model.create(req.body).then(data=>{
    res.status(201).json(data);
  }).catch(err=> {
    console.log(err);
    next(err);
  });
}

function getItem(req, res, next) {
  let paramID = req.params.id;
  console.log('paramID', paramID, req.model);
  // if (req.model == 'dashboard') {
  //   dashboard(paramID);
  // } else {
  req.model.get(paramID).then(data => {

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
  // }
}

function updateOneItem(req, res, next) {
  let paramID = req.params.id;
  req.model.update(paramID, req.body).then(data=>{
    res.status(201).json(data);
  }).catch(err=> {
    console.log(err);
    next(err);
  });
}

function deleteOneItem(req, res, next) {
  let paramID = req.params.id;
  req.model.delete(paramID).then(data=>{
    res.status(201).json(data);
  }).catch(err=> {
    console.log(err);
    next(err);
  });
}


module.exports = router;


// const chatRouter = require('./routes/chat');
// const wallRouter = require('./routes/wall');

// app.use(wallRouter);
// app.use(chatRouter);


// // For dashboard
// const dashboard = require('./routes/dashboard');
// app.use('/', dashboard);

// // For notification
// const notification = require('./routes/notification');
// app.use('/', notification);

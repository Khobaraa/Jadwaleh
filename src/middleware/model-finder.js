'use strict';

const chat = require('../models/chat-model.js');
const history = require('../models/history-model.js');
const notification = require('../models/notification-model.js');
const template = require('../models/template-model.js');
const users = require('../models/users-model.js');
const wall = require('../models/wall-model.js');
const weekly = require('../models/timetable-model.js');


/**
 * Looks up the proper model with url param
 */
module.exports = (req, res, next) => {
  let model = req.params.model;
  switch(model) {

  case 'dashboard': 
    req.model = history;
    req.switch = 'dashboard';
    next();
    break;
    
  case 'chat': 
    req.model = chat;
    next();
    break;

  case 'history': 
    req.model = history;
    next();
    break;

  case 'notification': 
    req.model = notification;
    next();
    break;

  case 'template': 
    req.model = template;
    next();
    break;

  case 'users': 
    req.model = users;
    next();
    break;

  case 'wall': 
    req.model = wall;
    next();
    break;

  case 'weekly': 
    req.model = weekly;
    next();
    break;
  default:
    next(
      'Available Models/Routes are: \n\n\
        1- chat \n\
        1- history \n\
        1- notification \n\
        1- template \n\
        1- users \n\
        1- wall \n\
        1- weekly \n',
    );
    break;
  }
};
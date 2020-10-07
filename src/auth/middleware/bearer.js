'use strict';

const users = require('../models/users-model');

module.exports = (req, res, next)=> {
  if (!req.headers.authorization) {
    return next('Invalid Login, No Headers !!');
  }
  let bearer = req.headers.authorization.split(' ');
   
  if (bearer[0] == 'Bearer') {
    const token = bearer[1];
    users.authenticateToken(token).then(validUser=> {
      req.user = validUser;
      next();
    }).catch(err=> next('Invalid Token!'));

  } else {
    return next('Invalid Bearer!!');
  }





};
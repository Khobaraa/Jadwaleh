'use strict';

const base64 = require('base-64');
const users = require('../models/users-model');

module.exports = (req, res, next) => {
  console.log('req.headers.authorization >>>>', req.headers.authorization);
  const auth = req.headers.authorization.split(' ');

  if(auth[0] == 'Basic') {
    console.log('inside basic and stuck maybe');
    const [email, password] = base64.decode(auth[1]).split(':');

    users.authenticateBasic(email, password).then(validUser=>{
      let token = users.generateToken(validUser);
      req.token = token;
      req.user = validUser;
      console.log('done!');
      next();        
    }).catch(err=> next(err));
    
  } else {
    next('Invalid Login!! ');
  }
};
'use strict';
const base64 = require('base-64');
module.exports = (action) => {
  return (req, res, next) => {

    if (req.headers.authorization) return next();
    if (action === 'Basic') {

      console.log(req.body.email + req.body.password);
      req.headers.authorization = 'Basic ' + base64.encode(req.body.email + ':' + req.body.password);
      next();
    } else if (action === 'Bearer' && req.headers.cookie) {
      try {
        let cookies = req.headers.cookie.split(' ');
        let token = cookies.filter(val => { if (val.includes('token')) return val; })[0].split('=')[1];
        req.headers.authorization = 'Bearer ' + token.split(';')[0];
        next();
      } catch (e) { return next(); }
    }

  };
  // if (action === 'bearer') {

  // }
};
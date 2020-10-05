'use strict';

// Server files include authentication, their middlewares, and socket.io server connection with express.
// The rest could be handled through routing

// requirements constants
const express = require('express');
const cors = require('cors');
const notFoundHandler = require('./auth/middleware/404');
const serverErrorHandler = require('./auth/middleware/500');
const authRouter =  require('./routes/auth-router.js');

const app = express();

// Global MiddleWare where you could call it anywhere and has a global scope
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(serverErrorHandler);
app.use('*', notFoundHandler);
app.use(express.static('./public'));


module.exports = {
  server: app, 
  start: port => {
    let PORT = port || process.env.port || 3000;
    app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));
  },
};
'use strict';

// This file includes dependencies, some middleware, and socket.io server connection with express.
// Rest is handled with a routing mechanism.

// requirements constants
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app);

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//client side?
const io = require('socket.io')(http);
// require('./apps/chat/chat')(io);
// require('./apps/wall/wall')(io);

const notFoundHandler = require('./middleware/404');
const serverErrorHandler = require('./middleware/500');

// Global MiddleWare where you could call it anywhere and has a global scope
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));      // to support all types of bodies
app.use(cors());
app.use(cookieParser());
app.use(serverErrorHandler);

// ------------ IO connection ------------ //

io.on('connection', (socket) => {

  socket.on('notification', msg => {
    console.log(msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });  
});

// ------------ Routes ------------ //
const v1Router = require('./router.js');
app.use('/api/v1', v1Router);

// For notification
const notification = require('./routes/notification');
app.use('/', notification);

app.use('*', notFoundHandler);

module.exports = {
  server: http,
  start: port => {
    let aPort = port || process.env.PORT || 3000;
    http.listen(aPort, () => console.log(`Listening on port ${aPort}`));
  },
};
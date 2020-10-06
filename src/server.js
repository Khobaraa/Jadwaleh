'use strict';

// Server files include authentication, their middlewares, and socket.io server connection with express.
// The rest could be handled through routing

// requirements constants
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.set('view engine', 'ejs');

require('./apps/chat/chat')(io);
const chatRouter = require('./routes/chat');
const notFoundHandler = require('./auth/middleware/404');
const serverErrorHandler = require('./auth/middleware/500');
const authRouter =  require('./routes/auth-router.js');

// Global MiddleWare where you could call it anywhere and has a global scope
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(authRouter);
app.use(serverErrorHandler);
app.use(express.static('./public'));
app.use(chatRouter);

///////////////////////////////////////////

io.on('connection', (socket) => {

  socket.on('notification', msg => {
    console.log(msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });  
});

// custom all containing route

// For dashboard
const dashboard = require('./routes/dashboard');
app.use('/', dashboard);

// For notification
const notification = require('./routes/notification');
app.use('/', notification);


app.use('*', notFoundHandler);

module.exports = {
  server: http,
  start: port => {
    let PORT = port || 3000;
    http.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  },
};
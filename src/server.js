'use strict';

// Server files include authentication, their middlewares, and socket.io server connection with express.
// The rest could be handled through routing

// requirements constants
const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
require('./apps/chat/chat')(io);
const cors = require('cors');
const chatRouter = require('./routes/chat');
app.use(express.json());
app.use(cors());
app.use(chatRouter);



module.exports = {
  server: http,
  start: port => {
    let PORT = port || 3000;
    http.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  },
};
'use strict';

const express = require('express');
const app = express.Router();
var io = require('socket.io')();

app.get('/notification', function(req, res) {
  res.send('Hey');
});


io.on('connection', function (socket) {
  socket.on( 'new_notification', function( data ) {
    console.log(data.title,data.message);
    io.sockets.emit( 'show_notification', { 
      title: data.title, 
      message: data.message, 
      icon: data.icon, 
    });
  });
});

module.exports = app;
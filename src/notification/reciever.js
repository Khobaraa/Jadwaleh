'use strict';

const express = require('express');
const router = express.Router();
const events = require('./events');

events.on('signin', username => console.log('Welcome back, ', username));

router.get('/foo', (req,res) => {
//   events.emit('pickup', {payload:'ppppppp'});
});

module.exports = router;
// module.exports = function (io) {
//   //Socket.IO
//   io.on('connection', function (socket) {
//     console.log('User has connected to Index');
//     //ON Events
//     socket.on('test', function () {
//       console.log('Successful Socket Test');
//     });
//     io.sockets.emit('admin', {test:'test'});

//     //End ON Events
//   });
//   events.on('pickup', payload => console.log('pickup', payload));

//   //   var socket = io();

//   router.get('/foo', (req,res) => {
//     console.log('fooooooo');
//     events.emit('pickup', {payload:'ppppppp'});
//   });

//   return router;
// };
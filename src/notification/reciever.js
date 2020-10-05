
// 'use strict';

// const express = require('express');
// const app = express.Router();
// var io = require('socket.io')();

// // app.get('/notification', function(req, res) {
// //   res.send('Hey');
// // });


// io.on('connection', function (socket) {
//   socket.on( 'new_notification', function( data ) {
//     console.log(data.title,data.message);
//     io.sockets.emit( 'show_notification', { 
//       message: data.message, 
//     });
//   });
// });

// module.exports = app;
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
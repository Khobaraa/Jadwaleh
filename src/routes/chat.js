const express = require('express');
const Router = express.Router();
const path = require('path');

Router.use(express.static(path.join(__dirname, '../../public')));

Router.get('/chat', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../public/chat.html'));
});
Router.get('/chatRoom', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../public/chatRoom.html'));
});

module.exports = Router;
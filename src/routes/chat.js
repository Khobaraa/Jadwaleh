const express = require('express');
const Router = express.Router();
const path = require('path');
const header = require('../auth/middleware/header');
Router.use(header('Bearer'));
Router.use(express.static(path.join(__dirname, '../../public')));
const bearer = require('../auth/middleware/bearer');
Router.use(bearer);
Router.get('/chat', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../public/chat.html'));
});
Router.get('/chatRoom', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../public/chatRoom.html'));
});

module.exports = Router;
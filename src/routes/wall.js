const express = require('express');
const Router = express.Router();
const path = require('path');
Router.use(express.static(path.join(__dirname, '../../public')));

Router.get('/wall/give-support/:userId', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../public/give-support.html'));
});

Router.get('/wall', (req, res) => {
  // res.cookie('ownerId','3344434343434');
  res.sendFile(path.resolve(__dirname + '/../../public/wall.html'));
});

module.exports = Router;
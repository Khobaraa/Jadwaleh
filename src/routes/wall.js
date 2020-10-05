const express = require('express');
const user = require('../auth/models/users-model');
const Router = express.Router();
const path = require('path');
Router.use(express.static(path.join(__dirname, '../../public')));

Router.post('/wall/give-support/:userId', (req, res) => {
	let userId = req.params;
	user.update()
  res.sendFile(path.resolve(__dirname + '/../../public/give-support.html'));
});

Router.post('/wall', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../public/wall.html'));
});

module.exports = Router;
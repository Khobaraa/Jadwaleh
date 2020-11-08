'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server');

const MONGOOSE_URL = process.env.MONGOOSE_URL;

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(MONGOOSE_URL, mongooseOptions)
  .then(console.log('good'));

server.start(3001);

// http server for socket.io

// server.http.listen(3000, () => {
//   console.log('http server connected');
// });


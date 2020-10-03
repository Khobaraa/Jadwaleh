'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server.js');
// const MONGOOSE_URL = 'mongodb://localhost:27017/auth-db';
const MONGOOSE_URL = process.env.mongo_URL;
const PORT = process.env.port || 3000;

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(MONGOOSE_URL, mongooseOptions);

// server.start(3000);

// http server for socket.io

server.http.listen(PORT, () => {
  console.log('http server connected');
});


'use strict';

const mongoose = require('mongoose');
/**
 * defines the static schema that is used universally as 
 * username and password
 */
const USERS = mongoose.model('Users', {
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['user', 'writer', 'editor', 'admin']},
});

class Model {

  constructor() {

  }
  /**
 * gets the specified ID from mongoose db
 * @param {String} _id is a mongoose generated ID to search for
*/
  get(_id) {  
    return _id ? USERS.find({_id}) : USERS.find({});
  }
}

module.exports = new Model();

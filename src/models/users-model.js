'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const Model = require('../mongo.js');
/**
* defines actions specified for each role 
*/
let roles = {
  student: ['read', 'create'],
  teacher: ['read', 'create', 'update'],
  admin: ['read', 'create', 'update', 'delete'],
};
/**
* defines the static schema that is used universally as 
* username and password
*/
const schema = mongoose.model('users', {
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['student', 'teacher', 'admin']},
});

class User extends Model {
  constructor() {
    super(schema);
  }
  /**
  * creates the record object as a new mongoose entry 
  * @param {object} record is a valid object input ready to use in schema.
  */
  async create(record) {
    console.log('Check for ', record);

    let userDB = await this.schema.findOne({ email: record.email });
    console.log('userDB', userDB);
    if (!userDB) {
      // save user if it does not exist
      try {
        record.password = await bcrypt.hash(record.password, 5);
        console.log('new Record', record);
      } catch(e) {
        console.log('error in bcrypt: ', e);
      }
      return super.create(record); // invokes parent
    } else {
      return 'User Exists!';
    }
  }
  /**
  * gets the specified ID from mongoose db
  * @param {String} email is the user data that would be authenticated
  * @param {String} password is the password that will be compared locally 
  */
  async authenticateBasic(user, password) {
    console.log('Authenticating');
    let userDB = await this.schema.findOne({ email: user });
    console.log('userSB', userDB);

    if (userDB) {
      let valid = await bcrypt.compare(password, userDB.password);
      console.log('valid?', valid);
      return valid ? userDB : Promise.reject();
    }
    return 'Invalid Auth';  
  }
  /**
  * gets the specified ID from mongoose db
  * @param {String} user is the string used to generate a token associated with it
  * 
  */
  generateToken(user) {
    let token = jwt.sign({
      email: user.email,
      actions: roles[user.role],
      userId : user._id, 
    }, secret);
    return token;
  }
  /**
  * gets the specified ID from mongoose db
  * @param {String} token will be compared locally for a quick and 
  * streamlined authentication for every other request shortly after signin.
  * 
  */
  async authenticateToken(token) {
    try {
      let tokenObject = jwt.verify(token, secret);
      let userDB = await this.schema.findOne({ email: tokenObject.email });
      if (userDB) {
        return Promise.resolve({
          tokenObject: tokenObject,
          user: userDB,
        });
      } else {
        return Promise.reject();
      }
    } catch(e) {
      return Promise.reject();
    }
  }
}

module.exports =  new User;


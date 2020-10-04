'use strict';
/** 
 * function that contains all operations to use in mongoose
 * 
 * */
class Model {
  constructor(schema) {
    this.schema = schema;
  }
  /**
   * creates the record object as a new mongoose entry 
   * @param {object} record is a valid object input ready to use in schema.
   */
  async create(record) {

    console.log('Checking for ', record.name);

    let userDB = await this.schema.findOne({ name: record.name });
    console.log('userDB', userDB);
    if (!userDB) {
      // save user if it does not exist
      let newRecord = new this.schema(record);
      return newRecord.save();
    }
    return 'Template Exists!';
  }
  /**
   * gets the specified ID from mongoose db
   * @param {String} _id is a mongoose generated ID to search for
   */
  read(_id) {
    let obj = _id ? {_id} : {};    
    return this.schema.find(obj);
  }
  /**
   * updates the specified _id with the record object
   * @param {String} _id is a mongoose generated ID to search for
   * @param {object} record is a valid object input ready to use in schema.
   */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record);
  }
  /**
   * deletes the specified ID from mongoose db
   * @param {String} _id is a mongoose generated ID to search for
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
  /**
   * clears the specified schema from all of its entries at mongoose db
   * or deletes a specific category specified in the input
   * @param {String} category is an object that is matched with the entry for deletion
   */
  clear() {
    return this.schema.deleteMany({});
  }
}

module.exports = Model;

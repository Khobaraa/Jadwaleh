// Create a record
const template = require('./template-collection.js');
const util = require('util');

async function fillEmptyDB() {
  // console.log(util.inspect(defaultTemplate, false, null, true /* enable colors */))

  // Insert record
  console.log('inserting good..');
  let saved = await template.create(defaultTemplate);
  console.log('saving..');

  console.log('inserting bad..');
  let bad = await template.create(badTemplate);
  console.log('saving..');

  console.log(util.inspect(saved, false, null, true /* enable colors */));

}

const defaultTemplate = {
  name: 'Tawjihi',
  subjects: [
    {
      name: 'Arabic',
      expectedHours: 300,
      units: [
        {
          number: 1,
          chapters: [1,2,3,4],
          completed: 0,
        },
        {
          number: 2,  
          chapters: [1,2,3],
          completed: 0,
        },
        {
          number: 3,
          chapters: [1,2],
          completed: 0,
        },
        {
          number: 4,
          chapters: [1,2],
          completed: 0,
        },
      ],
    },
    {
      name: 'English',
      expectedHours: 250,
      units: [
        {
          number: 1,
          chapters: [1],
          completed: 0,
        },
        {
          number: 2,  
          chapters: [1,2],
          completed: 0,
        },
        {
          number: 3,
          chapters: [1,2,3],
          completed: 0,
        },
        {
          number: 4,
          chapters: [1,2,3,4],
          completed: 0,
        },
      ],
    },
  ],
};

const badTemplate = {
  name: 'bad',
  subjects: [],
};



module.exports = fillEmptyDB;
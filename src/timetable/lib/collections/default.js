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
  name: 'Scientific Stream',
  courses: [
    {
      name: 'Physics',
      expectedHours: 150,
      noOfChapters: 3,
      chapters: [
        {
          name: 'chapter1',
          duration: 1,
          state: 'completed',
        },
        {
          name: 'chapter2',
          duration: 2,
          state: 'completed',
        },
        {
          name: 'chapter3',
          duration: 1,
          state: 'in-progress',
        },
      ],
      isCompleted: false,
    },
    {
      name: 'Mathematics',
      expectedHours: 100,
      noOfChapters: 3,
      chapters: [
        {
          name: 'chapter1',
          duration: 2,
          state: 'completed',
        },
        {
          name: 'chapter2',
          duration: 1,
          state: 'completed',
        },
        {
          name: 'chapter3',
          duration: 3,
          state: 'in-progress',
        },
      ],
      isCompleted: false,
    },
    {
      name: 'Chemistry',
      expectedHours: 150,
      noOfChapters: 3,
      chapters: [
        {
          name: 'chapter1',
          duration: 1,
          state: 'completed',
        },
        {
          name: 'chapter2',
          duration: 2,
          state: 'completed',
        },
        {
          name: 'chapter3',
          duration: 2,
          state: 'completed',
        },
      ],
      isCompleted: true,
    },
    {
      name: 'Biology',
      expectedHours: 100,
      noOfChapters: 3,
      chapters: [
        {
          name: 'chapter1',
          duration: 3,
          state: 'completed',
        },
        {
          name: 'chapter2',
          duration: 2,
          state: 'completed',
        },
        {
          name: 'chapter3',
          duration: 1,
          state: 'in-progress',
        },
      ],
      isCompleted: false,
    },
    {
      name: 'English',
      expectedHours: 100,
      noOfChapters: 3,
      chapters: [
        {
          name: 'chapter1',
          duration: 2,
          state: 'completed',
        },
        {
          name: 'chapter2',
          duration: 1,
          state: 'not-studied',
        },
        {
          name: 'chapter3',
          duration: 3,
          state: 'not-studied',
        },
      ],
      isCompleted: false,
    },
  ],
  student_id: '5f79cd4995eecc07d8a37dfa',
};

const badTemplate = {
  name: 'bad',
  subjects: [],
};



module.exports = fillEmptyDB;
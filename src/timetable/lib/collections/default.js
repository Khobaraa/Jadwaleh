// Create a record
const template = require('./template-collection.js');
const util = require('util');

async function fillEmptyDB() {
  // console.log(util.inspect(defaultTemplate, false, null, true /* enable colors */))

  // Insert record
  let saved = await template.create(defaultTemplate);
  // console.log(util.inspect(saved, false, null, true /* enable colors */));

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
          state: 0,
        },
        {
          name: 'chapter2',
          duration: 2,
          state: 0,
        },
        {
          name: 'chapter3',
          duration: 1,
          state: 0,
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
          state: 0,
        },
        {
          name: 'chapter2',
          duration: 1,
          state: 0,
        },
        {
          name: 'chapter3',
          duration: 3,
          state: 0,
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
          state: 0,
        },
        {
          name: 'chapter2',
          duration: 2,
          state: 0,
        },
        {
          name: 'chapter3',
          duration: 2,
          state: 0,
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
          state: 0,
        },
        {
          name: 'chapter2',
          duration: 2,
          state: 0,
        },
        {
          name: 'chapter3',
          duration: 1,
          state: 0,
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
          state: 0,
        },
        {
          name: 'chapter2',
          duration: 1,
          state: 0,
        },
        {
          name: 'chapter3',
          duration: 3,
          state: 0,
        },
      ],
      isCompleted: false,
    },
  ],
  student_id: '5f79cd4995eecc07d8a37dfa',
};

module.exports = fillEmptyDB;
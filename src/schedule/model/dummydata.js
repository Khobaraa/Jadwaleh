'use strict';

const schema = require('./template');

async function fillEmptyDB() {
  await schema.create(dummy);
}
  
const dummy = {
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

module.exports = fillEmptyDB;
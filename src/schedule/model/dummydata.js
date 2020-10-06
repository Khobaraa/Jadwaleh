'use strict';

const schema = require('./template');

async function fillEmptyDB() {
  await schema.create(dummy);
}

function semesterDates() {
  let curr = new Date();
  let semester = [];
  for (let j = 0; j < 16; j++) {
    let week = [];
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
      week.push(day);
    }
    semester.push(week);
  }
  return semester;
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
          date: semesterDates()[0][0],
          state: 'completed',
        },
        {
          name: 'chapter2',
          duration: 2,
          date: semesterDates()[1][0],
          state: 'completed',
        },
        {
          name: 'chapter3',
          duration: 1,
          date: semesterDates()[2][0],
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
          date: semesterDates()[0][1],
          state: 'completed',
        },
        {
          name: 'chapter2',
          duration: 1,
          date: semesterDates()[1][1],
          state: 'completed',
        },
        {
          name: 'chapter3',
          duration: 3,
          date: semesterDates()[2][1],
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
          date: semesterDates()[0][2],
          state: 'completed',
        },
        {
          name: 'chapter2',
          duration: 2,
          date: semesterDates()[1][2],
          state: 'completed',
        },
        {
          name: 'chapter3',
          duration: 2,
          date: semesterDates()[2][2],
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
          date: semesterDates()[0][3],
          state: 'completed',
        },
        {
          name: 'chapter2',
          duration: 2,
          date: semesterDates()[1][3],
          state: 'completed',
        },
        {
          name: 'chapter3',
          duration: 1,
          date: semesterDates()[2][3],
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
          date: semesterDates()[0][4],
          state: 'completed',
        },
        {
          name: 'chapter2',
          duration: 1,
          date: semesterDates()[1][4],
          state: 'not-studied',
        },
        {
          name: 'chapter3',
          duration: 3,
          date:semesterDates()[2][4],
          state: 'not-studied',
        },
      ],
      isCompleted: false,
    },
  ],
  student_id: '5f79cd4995eecc07d8a37dfa',
};

module.exports = fillEmptyDB;
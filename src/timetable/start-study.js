#!/usr/bin/env node

'use strict';
const inquirer = require('inquirer');
const util = require('util');

require('dotenv').config();
const Input = require('./lib/input.js');
const fillEmptyDB = require('./lib/collections/default.js');
const template = require('./lib/collections/template-collection.js');
const history = require('./lib/collections/history-collection.js');
const weekly = require('./lib/collections/weekly-collection.js');
const getUsers = require('./lib/collections/users-model.js');

const mongoose = require('mongoose');
const MONGOOSE_URL = process.env.MONGOOSE_URL ;
mongoose.connect(MONGOOSE_URL, {
  useNewUrlParser : true,
  useUnifiedTopology : true,
  useCreateIndex : true,
  useFindAndModify : false,
});

const table = {
  week: [
    {
      number: 1,
      totalHoursWeek: 0,
      day: [
        {
          number: 1,
          topics: [
            {
              name: '',
              totalHours: 0,
              completed: 0,
            },
          ],
          totalHoursDay: 0,
        },
      ],
    },
  ],
};

let date = 1;

async function getInput(template, list) {
  let picked = -1;

  do {
    console.log(util.inspect(list, false, null, true /* enable colors */));
    const response = await inquirer.prompt([{
      name: 'subject',
      message: `-------------------------- \n Choose a subject to start with a number or enter a command starting with - \n`,
    }]);

    let [argument, value] = response.subject.split(' ');
    console.log(argument);
    switch(argument) {
    case '-save':
    case '-s':
      console.log('saving week progress');
      break;
    case '-history':
    case '-h':
      console.log('getting past table at week' + value);
      // getTable();
      break;
    case '-date':
    case '-d':
      date = value;
      console.log('apply date', date);
      break;
    default: 
      picked = argument - 1;
      break;
    }

  } while (!(!isNaN(picked) && picked >= 0 && picked < list.length)); // checks if input is a number and within limit

  console.log('chosen: ', picked);
  console.log('Starting Session with ..', list[picked]);
  updateHistory(template, list[picked]);          // instant progress and update history
  

  // let dayWeek = date%7 == 0 ? 7 : date%7;          // update table weeks to show
  // table.week1[dayWeek - 1].push(list[picked]);
  list.splice(picked,1);

  setTimeout(async () => {
    console.log('done studying! >>>>>>>>>>>>>>>>>>>>>');
    await getInput(template, list);
  }, 3000);
}

async function getTemplate(starterTemplates, pastTemplates, chosenUser) {
  let choice = -1;
  let validTemplateNames = [];
  let chosenTemplate = {};
  let subjectsToChoose = [];

  for (let keys in starterTemplates) {                // pushes both starter and past template into validTemplateNames
    validTemplateNames.push(starterTemplates[keys].name);
  }
  for (let keys in pastTemplates) {
    validTemplateNames.push(pastTemplates[keys].name);
  }
  console.log('Valid Template Names \n', validTemplateNames);

  do {
    const input = await inquirer.prompt([
      { name: 'template', message: 'Choose a template from the list with a number \n' },
    ]);
    choice = input.template.split(' ')[0] - 1;
  } while (!(!isNaN(choice) && choice >= 0 && choice < validTemplateNames.length)); // checks if input is a number and within limit

  console.log('Chosen: ', validTemplateNames[choice]); // gets the valid choice and gets the template
  if (choice >= starterTemplates.length) {
    console.log('Choosing from past template: ', validTemplateNames[choice]);
    chosenTemplate = pastTemplates[choice - starterTemplates.length];
  } 
  else {
    console.log('Choosing from starter template: ', validTemplateNames[choice]);
    chosenTemplate = starterTemplates[choice];
    console.log('chosenTemplate', chosenTemplate);
    if (chosenTemplate.courses.length <= 0) {
      console.log('Invalid template ' + choice);
      await getTemplate(starterTemplates, pastTemplates, chosenUser);
    } 
    else {
      console.log('adding new template attached to the user..', chosenUser);    // uses template name to avoid duplication
      console.log('adding new template attached to the user..', chosenUser._id);    // uses template name to avoid duplication
      chosenTemplate.student_id = chosenUser._id;
      chosenTemplate.name += ' for ' + chosenUser.username;
      console.log(`saving template to the id.. >>>>>>>>> ${chosenTemplate.student_id}`);
    
      let historyTemplate = chosenTemplate.toObject();      // cant create new mongoose entry before 
      chosenTemplate = await history.create(historyTemplate);   // converting it back from mongoose document to object
      console.log(util.inspect(historyTemplate, false, null, true /* enable colors */));
    }
  }

  for (let k = 0; k < chosenTemplate.courses.length; k++) {      //fills in the chapters of each unit and lesson as a choice table
    for (let i = 0; i < chosenTemplate.courses[k].chapters.length; i++) {
      if (!(chosenTemplate.courses[k].chapters[i].state == 'completed')) {
        subjectsToChoose.push({
          course: k,
          chapter: i,
          info: [
            chosenTemplate.courses[k].name,
            chosenTemplate.courses[k].chapters[i].name,
            'Workload: ' + chosenTemplate.courses[k].chapters[i].duration,
          ],
        });
      }
    }
  }

  return [chosenTemplate, subjectsToChoose];
}

async function getUser(users) {
  let usernames = [];
  let choice = -1;

  for (let i = 0; i < users.length; i++) {
    usernames.push(users[i].username);
  }
  console.log(usernames);

  do {
    const input = await inquirer.prompt([
      { name: 'template', message: 'Choose a user from the list with a number \n' },
    ]);
    choice = input.template.split(' ')[0] - 1;
  } while (!(!isNaN(choice) && choice >= 0 && choice < users.length)); // checks if input is a number and within limit
  console.log('chosen user', usernames[choice]);

  return users[choice];
}

async function arrangeSubjects(chosenTemplate, subjectsToChoose) {
  let choice = -1;

  do {
    const input = await inquirer.prompt([
      { name: 'template', message: 'rate difficulty of a subject from 1 - 10 \n' },
    ]);
    choice = input.template.split(' ')[0] - 1;
  } while (!(!isNaN(choice) && choice >= 0 && choice <= 11)); // checks if input is a number and within limit

  chosenTemplate, subjectsToChoose
  subjects.shift();

  console.log('chosen user', usernames[choice]);

}

async function startApp() {
  console.clear();
  console.log('reading..');

  // await history.clear();
  // await fillEmptyDB();

  let userList = await getUsers.get();
  let starterTemplates = await template.read();

  let chosenUser = await getUser(userList);
  let pastTemplates = await history.read(chosenUser._id);

  let [chosenTemplate, subjectsToChoose] = await getTemplate(starterTemplates, pastTemplates, chosenUser);
  [chosenTemplate, subjectsToChoose] = await arrangeSubjects(chosenTemplate, subjectsToChoose);
  await getInput(chosenTemplate, subjectsToChoose);
}

function getTable() {
  // console.log(util.inspect(table, false, null, true /* enable colors */))
}

async function updateHistory(template, topic) {
  template.courses[topic.course].chapters[topic.chapter].state = 'completed'; //change completed
  console.log('Update completion! ', template.courses[topic.course].chapters[topic.chapter]);

  console.log(`updating.. >>>>>>>>> ${template.name} with id ${template.student_id}`);
  await history.update(template._id, template);
}


startApp();
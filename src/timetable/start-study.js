#!/usr/bin/env node

'use strict';
const inquirer = require('inquirer');
const util = require('util');

const Input = require('./lib/input.js');
const fillEmptyDB = require('./lib/collections/default.js');
const template = require('./lib/collections/template-collection');
const history = require('./lib/collections/history-collection');
const weekly = require('./lib/collections/weekly-collection');

const mongoose = require('mongoose');
// const MONGOOSE_URL = 'mongodb://localhost:27017/jadwalla';
const MONGOOSE_URL = 'mongodb+srv://admin:admin@cluster0.m6biy.mongodb.net/jadwal?retryWrites=true&w=majority';
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
let validTemplates;
let pastTemplates;

async function getInput(choice, template) {
  let picked = -1;

  do {
    console.log(util.inspect(choice, false, null, true /* enable colors */));
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
      console.log('getting history at week' + value);
      // getHistory();
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

  } while (!(!isNaN(picked) && picked >= 0 && picked < choice.length));

  console.log('chosen: ', picked);
  console.log('Starting Session with ..', choice[picked]);
  updateHistory(choice[picked], template);          // instant progress and update history
  

  // let dayWeek = date%7 == 0 ? 7 : date%7;          // update table weeks to show
  // table.week1[dayWeek - 1].push(choice[picked]);
  choice.splice(picked,1);

  setTimeout(() => {
    console.log('done studying! >>>>>>>>>>>>>>>>>>>>>');
    getInput(choice, template);
  }, 3000);
}

async function getTemplate(validTemplates, pastTemplates) {
  let subjectsToChoose = [];
  let inputNum = -1;

  console.log('validTemplates \n', validTemplates);

  let validTemplateNames = [];
  for (var keys in validTemplates) {
    validTemplateNames.push(validTemplates[keys].name);
  }
  console.log('validTemplateNames \n', validTemplateNames);
  do {
    const input = await inquirer.prompt([
      { name: 'template', message: 'Choose a template from the list with number \n' },
    ]);
    inputNum = input.template.split(' ')[0] - 1;
  } while (!(!isNaN(inputNum) && inputNum >= 0 && inputNum < validTemplateNames.length));
  console.log('chosen: ', inputNum);

  if (validTemplates[inputNum].subjects.length <= 0) {
    throw new Error('Invalid Template');
  }

  for (let k = 0; k < validTemplates[inputNum].subjects.length; k++) {      //fills in the chapters of each unit and lesson as a choice table
    for (let i = 0; i < validTemplates[inputNum].subjects[k].units.length; i++) {
      for (let j = 0; j < validTemplates[inputNum].subjects[k].units[i].chapters.length; j++) {
        subjectsToChoose.push([
          validTemplates[inputNum].subjects[k].name,
          'Chapter ' + validTemplates[inputNum].subjects[k].units[i].number, 
          'Lesson ' + validTemplates[inputNum].subjects[k].units[i].chapters[j
          ]]);
      }
    }
  }

  console.log('adding new template attached to the user..');
  validTemplates[inputNum].name += ' user';
  console.log(`saving.. >>>>>>>>> ${validTemplates[inputNum].name}`);

  let historyTemplate = validTemplates[inputNum].toObject();      // cant create new mongoose entry before converting it to object
  await history.create(historyTemplate);
  console.log(`saved.. >>>>>>>>> \n`);
  console.log(util.inspect(historyTemplate, false, null, true /* enable colors */));

  getInput(subjectsToChoose, inputNum);
}


async function startApp() {
  console.clear();
  console.log('reading..');

  pastTemplates = await history.read();
  validTemplates = await template.read();
  // await template.clear();
  // await fillEmptyDB();
  await getTemplate(validTemplates, pastTemplates);

  // mongoose.disconnect();
}

function getHistory() {
  // console.log(util.inspect(table, false, null, true /* enable colors */))
}

async function updateHistory(topic, template) {
  for (let i = 0; i < validTemplates[template].subjects.length; i++) {
    if (validTemplates[template].subjects[i].name == topic[0]) {
      validTemplates[template].subjects[i].units[topic[1].split(' ')[1] - 1].completed++; //change completed
      console.log('Update completion! ', validTemplates[template].subjects[i].units[topic[1].split(' ')[1] - 1]);
    }
  }
  console.log(`updating.. >>>>>>>>> ${validTemplates[template].name} with id ${validTemplates[template]._id}`);
  await history.update(validTemplates[template]._id, validTemplates[template]);
}


startApp();
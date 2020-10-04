#!/usr/bin/env node

'use strict';
const inquirer = require('inquirer');
const util = require('util');

require('dotenv').config();
const Input = require('./lib/input.js');
const fillEmptyDB = require('./lib/collections/default.js');
const template = require('./lib/collections/template-collection');
const history = require('./lib/collections/history-collection');
const weekly = require('./lib/collections/weekly-collection');

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
let starterTemplates;
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

async function getTemplate(starterTemplates, pastTemplates) {
  let subjectsToChoose = [];
  let choice = -1;
  let validTemplateNames = [];
  let chosenTemplate = {};

  for (let keys in starterTemplates) {
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
    choice = input.template.split(' ')[0] - 1;    // gets first input and checks if its within limit
  } while (!(!isNaN(choice) && choice >= 0 && choice < validTemplateNames.length));

  console.log('Chosen: ', choice);            // gets the valid choice and gets the template
  if (choice >= starterTemplates.length) {
    console.log('Choosing from past template at ' + choice - starterTemplates.length);
    chosenTemplate = pastTemplates[choice - starterTemplates.length];
  } else {
    console.log('Choosing from starter template at ' + choice);
    chosenTemplate = starterTemplates[choice];
  }

  if (chosenTemplate.subjects.length <= 0) {
    console.log('Invalid template ' + choice);
    getTemplate(starterTemplates, pastTemplates);
  }

  // for (let k = 0; k < starterTemplates[choice].subjects.length; k++) {      //fills in the chapters of each unit and lesson as a choice table
  //   for (let i = 0; i < starterTemplates[choice].subjects[k].units.length; i++) {
  //     for (let j = 0; j < starterTemplates[choice].subjects[k].units[i].chapters.length; j++) {
  //       subjectsToChoose.push([
  //         starterTemplates[choice].subjects[k].name,
  //         'Chapter ' + starterTemplates[choice].subjects[k].units[i].number, 
  //         'Lesson ' + starterTemplates[choice].subjects[k].units[i].chapters[j
  //         ]]);
  //     }
  //   }
  // }

  // console.log('adding new template attached to the user..');
  // starterTemplates[choice].name += ' user';
  // console.log(`saving.. >>>>>>>>> ${starterTemplates[choice].name}`);

  // let historyTemplate = starterTemplates[choice].toObject();      // cant create new mongoose entry before 
  // await history.create(historyTemplate);                          // converting it back from mongoose document to object
  // console.log(`saved.. >>>>>>>>> \n`);
  // console.log(util.inspect(historyTemplate, false, null, true /* enable colors */));

  // getInput(subjectsToChoose, choice);
}


async function startApp() {
  console.clear();
  console.log('reading..');

  // await template.clear();
  // await fillEmptyDB();
  pastTemplates = await history.read();
  starterTemplates = await template.read();
  await getTemplate(starterTemplates, pastTemplates);

  // mongoose.disconnect();
}

function getHistory() {
  // console.log(util.inspect(table, false, null, true /* enable colors */))
}

async function updateHistory(topic, template) {
  for (let i = 0; i < starterTemplates[template].subjects.length; i++) {
    if (starterTemplates[template].subjects[i].name == topic[0]) {
      starterTemplates[template].subjects[i].units[topic[1].split(' ')[1] - 1].completed++; //change completed
      console.log('Update completion! ', starterTemplates[template].subjects[i].units[topic[1].split(' ')[1] - 1]);
    }
  }
  console.log(`updating.. >>>>>>>>> ${starterTemplates[template].name} with id ${starterTemplates[template]._id}`);
  await history.update(starterTemplates[template]._id, starterTemplates[template]);
}


startApp();
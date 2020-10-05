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

  } while (!(!isNaN(picked) && picked >= 0 && picked < list.length)); // checks if input is a number and within limit

  console.log('chosen: ', picked);
  console.log('Starting Session with ..', list[picked]);
  updateHistory(template, list[picked]);          // instant progress and update history
  

  // let dayWeek = date%7 == 0 ? 7 : date%7;          // update table weeks to show
  // table.week1[dayWeek - 1].push(list[picked]);
  list.splice(picked,1);

  setTimeout(() => {
    console.log('done studying! >>>>>>>>>>>>>>>>>>>>>');
    getInput(template, list);
  }, 3000);
}

async function getTemplate(starterTemplates, pastTemplates) {
  let choice = -1;
  let validTemplateNames = [];
  let chosenTemplate = {};
  let subjectsToChoose = [];

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
    choice = input.template.split(' ')[0] - 1;
  } while (!(!isNaN(choice) && choice >= 0 && choice < validTemplateNames.length)); // checks if input is a number and within limit

  console.log('Chosen: ', choice, starterTemplates.length, choice - starterTemplates.length); // gets the valid choice and gets the template
  if (choice >= starterTemplates.length) {
    console.log('Choosing from past template at ', (choice - starterTemplates.length));
    chosenTemplate = pastTemplates[choice - starterTemplates.length];
  } 
  else {
    console.log('Choosing from starter template at ', choice);
    chosenTemplate = starterTemplates[choice];
    if (chosenTemplate.courses.length <= 0) {
      console.log('Invalid template ' + choice);
      getTemplate(starterTemplates, pastTemplates);
    } 
    else {
      console.log('adding new template attached to the user..');    // uses template name to avoid duplication
      chosenTemplate.name += ' user';
      console.log(`saving.. >>>>>>>>> ${chosenTemplate.name}`);
    
      let historyTemplate = chosenTemplate.toObject();      // cant create new mongoose entry before 
      chosenTemplate = await history.create(historyTemplate);                          // converting it back from mongoose document to object
      console.log(`saved.. >>>>>>>>> \n`);
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

  getInput(chosenTemplate, subjectsToChoose);
}


async function startApp() {
  console.clear();
  console.log('reading..');

  // await template.clear();
  // await fillEmptyDB();
  let pastTemplates = await history.read();
  let starterTemplates = await template.read();
  await getTemplate(starterTemplates, pastTemplates);

  // mongoose.disconnect();
}

function getHistory() {
  // console.log(util.inspect(table, false, null, true /* enable colors */))
}

async function updateHistory(template, topic) {
  template.courses[topic.course].chapters[topic.chapter].state = 'completed'; //change completed
  console.log('Update completion! ', template.courses[topic.course].chapters[topic.chapter]);

  console.log(`updating.. >>>>>>>>> ${template.name} with id ${template.student_id}`);
  await history.update(template._id, template);
}


startApp();
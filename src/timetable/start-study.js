#!/usr/bin/env node

'use strict';
const inquirer = require('inquirer');
const Input = require('./lib/input.js');
const util = require('util');

// const Choice = require('./lib/choice.js');
// const choice = new Choice(input);

// const mongoose = require('mongoose');
// const MONGOOSE_URL = 'mongodb://localhost:27017/choice';
// mongoose.connect(MONGOOSE_URL, {
//   useNewUrlParser : true,
//   useUnifiedTopology : true,
//   useCreateIndex : true,
//   useFindAndModify : false
// });

// inquirer variables
let validTemplates =  {
  tawjihi: {
    arabic: {
      units: [
      {
        number: 1,
        chapters: [1,2,3,4],
        completed: 0
      },
      {
        number: 2,
        chapters: [1,2,3],
        completed: 0
      },
      {
        number: 3,
        chapters: [1,2],
        completed: 0
      },
      {
        number: 4,
        chapters: [1,2],
        completed: 0
      }],
      expectedHours: 300
    },
    english: {
      units: [
      {
        number: 1,
        chapters: [1],
        completed: 0
      },
      {
        number: 2,
        chapters: [1,2],
        completed: 0
      },
      {
        number: 3,
        chapters: [1,2,3],
        completed: 0
      },
      {
        number: 4,
        chapters: [1,2,3,4],
        completed: 0
      }],
      expectedHours: 100
    }
  },
  others: {
    valid: false
  }
}

let table = {
  week1: [[], [], [], [], [], [], []],
}

let template = '';
let subjectsToChoose = [];
let date = 1;

async function getInput() {
  console.log(subjectsToChoose);
  let picked = -1;
  do {
    const response = await inquirer.prompt([{
      name: 'subject',
      message: `-------------------------- \n Choose a subject to start with a number or enter a command starting with - \n`
    }]);

    let argument = response.subject.split(' ')[0];
    console.log(argument);
    switch(argument) {
      case '-history':
      case '-h':
        console.log('getting history at week' + response.subject.split(' ')[1]);
        getHistory();
        break;
      case '-date':
      case '-d':
        date = response.subject.split(' ')[1];
        console.log('apply date', date)
        break;
      default: 
        picked = response.subject.split(' ')[0] - 1;
        break;
  }

  } while (!(!isNaN(picked) && picked > 0 && picked < subjectsToChoose.length));

  console.log("response: ", picked)
  console.log("Starting Session with ..", subjectsToChoose[picked]);
  const input = new Input(subjectsToChoose[picked]);
  validTemplates[template]
  [subjectsToChoose[picked][0]]
  .units[subjectsToChoose[picked][1].split(' ')[1] - 1]
  .completed++; //change completed
  console.log('Update completion! ', validTemplates[template][subjectsToChoose[picked][0]].units[subjectsToChoose[picked][1].split(' ')[1]]);

  let dayWeek = date%7 == 0 ? 7 : date%7;
  table.week1[dayWeek - 1].push(subjectsToChoose[picked]);
  subjectsToChoose.splice(picked,1);
  input.print();

  setTimeout(() => {
    console.log('done studying! >>>>>>>>>>>>>>>>>>>>>')
    getInput();
  }, 3000)
}

async function getTemplate() {
  console.clear();
  let validTemplateNames = [];
  for (var keys in validTemplates) {
    validTemplateNames.push(keys)
  }
  console.log(validTemplateNames);

  do {
    const input = await inquirer.prompt([
      { name: 'template', message: 'Choose a template from the list \n' }
    ]);
    template = input.template.split(' ')[0];
  } while (!validTemplateNames.includes(template));
  validTemplates
  console.log(template);

  for (let keys in validTemplates[template]) {
    for (let i = 0; i < validTemplates[template][keys].units.length; i++) {
      for (let j = 0; j < validTemplates[template][keys].units[i].chapters.length; j++) {
        subjectsToChoose.push([keys, 'Chapter ' + validTemplates[template][keys].units[i].number, 'Lesson ' + validTemplates[template][keys].units[i].chapters[j]]);
      }
    }
  }

  getInput();
}

async function startApp() {
  getTemplate();

  // if (choice.valid() && !input.help) {
  //   await choice.execute();
  // } else {
  //   await choice.help();
  // } 
  // mongoose.disconnect();
}

function getHistory() {
  console.log(util.inspect(table, false, null, true /* enable colors */))
}

startApp();
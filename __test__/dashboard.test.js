'use strict';

const supergoose = require('@code-fellows/supergoose');
const { server } = require('../src/server');
const agent = supergoose(server);
const base64 = require('base-64');
const jwt = require('jsonwebtoken');

// const events = require('../notification/events');
const statistics = require('../src/dashboard/statistics');
// const bearerAuth = require('../auth/middleware/bearer');
const fill = require('../src/schedule/model/dummydata');
const schema = require('../src/dashboard/history-collection');


describe('Dashboard test', () => {
  const signinObj = {
    username: 'Ashjan',
    password: 'blah',
    role: 'admin',
  };
  const student = {
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
            state: 'in-progress',
          },
          {
            name: 'chapter3',
            duration: 1,
            state: 'not-studied',
          },
        ],
        isCompleted: false,
      },
    ],
    student_id: '',
  };

  it('can successfully check if the user is valid', async () => {
    const signupResponse = await agent.post('/signup').send(signinObj);
    const autHeader = base64.encode(
      `${signinObj.username}:${signinObj.password}`,
    );
    const signinResponse = await agent
      .post('/signin')
      .set('authorization', `Basic ${autHeader}`);
    student.student_id = signinResponse.body.user._id;
    expect(signupResponse.statusCode).toBe(200);
    expect(signinResponse.statusCode).toBe(200);
    expect(!!signupResponse.text).toBeTruthy();
  });

  it('can successfully return the dashboad values', async () => {
    const dash = [ { name: 'Physics', hours: 150, spentHours: 0, progress: 0 } ];
    await schema.create(student);
    let result = await statistics(student.student_id);
    expect(result).toEqual(dash);

  });
  it('can successfully return the dashboad values', async () => {
    const autHeader = base64.encode(
      `${signinObj.username}:${signinObj.password}`,
    );
    await agent.post('/signin')
      .set('authorization', `Basic ${autHeader}`);
  
    const bearerHeader = await jwt.sign({ username: 'Ashjan' }, 'mytokensecret');
    const response = await agent.get('/dashboard')
      .set('authorization', `Bearer ${bearerHeader}`);
    expect(response.statusCode).toBe(200);
    expect(response.text).toBeTruthy();
  });

  it('Returns a 404 status code if the user tried to use different route for dashboard', async () => {
    const response = await agent.post('/schedule').send(student);
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('404 Not Found');
  });
});
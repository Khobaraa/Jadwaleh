---
description: >-
  Here are the principally independent but interconnected components we used to
  get the project running at a meaningful level, along with future changes that
  would need to be implemented.
---

# Modules

## Getting the app running

Here is what you would do after cloning the app:

```
npm install
node ./index.js or npm start
```

And at start-study.js level to experience user input through the terminal:

```bash
node ./src/timetable/start-study.jsF
```

{% hint style="info" %}
Follow through the input, it is required to have a premade user account using the signup route through postman or simply use of
{% endhint %}

## Authorization 

The method was chosen from a common practice of using a cookie, token authorization through the module using user signup and login functionalities that are encrypted with bcrypt library, along with gmail OAuth as an alternative easy login.

## Organizer

The reasoning behind using a terminal was at hindsight, how hard testing it would be, and instead was taken as an approach to understand student flow better. This allowed for in depth understanding of how each student would navigate:

1. Entering the username info.
2. Choosing a premade template curriculum to study from.
3. Attempting to start a subject from an ordered list of subject.
4. Starts/ends session of study.
5. Saves the information on the database that then can be accessed server wide to display the information and thus gives off the "personalized" feeling.

Some adjustments were then planned once the front end is setup, to allow for minute adjustments by the student to affect how the flow happens, these are: 

* Adding and editing own template curriculum and upload it for others to choose from.
* Order of subjects should be affected by 3 main factors that affect a subject priority \(Relative difficulty, progression percentage and mood\), other effects could be considered as with how much revisions a student thinks he needs to make sure the subject is absorbed well.
* Start end session would be interactive enough to be an appealing process using multiple UI/UX considerations such as an animated background or even a study friendly music playlist.
* Information handling should be accessed by an admin backend front that is similar to django backend framework, although workload might deter from that happening.

## Data Pipeline

Basically how dataflow really happens, which at the moment seems the easiest to simply do CRUD on the NOSQL MongoDB multiple schemas, as each other schema has user\_id attached, along with date tag.

The building of a **notification system** involved multiple hooks on various operations using socket io methods, starting from simple login, to start/stop session and even as simply as a reminder to check the dashboard for progress monitoring.

That **dashboard** could use all resources that could be gathered from user behavior on the site, initially it simply works by adding up total hours spent and progress percentage to show data of each subject, but could be expanded to incorporate weekly progress with graphed data to show more details that is meaningful to both student and guardian.

## Meaningful Service

One of the considerations involved adding a chat system, but instead of being open is actually restricted to the current subject session, along with a possible mention emit to allow for notify of intended user. Expansion would allow for semi-permanent organizational rooms that are visible only to members, and 1 on 1 teacher student sessions when needed.

Another feature considers the personal space of students at the app, by providing a way of public communication of encouragement and useful tips that are attached as Walls.  



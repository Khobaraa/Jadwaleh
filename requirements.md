# Software Requirements

Jadwalla project defines our interest in solving a real problem using what we know as full-stack developers using the following technologies:

* MongoDB \(User Info, History, Progress, Chat messages\)
* ExpressJS \(Http connection\)
* ReactJS \(Front-end, native\)
* NodeJS \(Routing, Authentication, API, Modularity\)
* Socket.io \(Chat, notifications\)

this.md is an attempt at producing software as a service \(SAAS\) type of product, with a direct aim at senior highschool aka Tawjihi students in Jordan as a group of interest. The challenge involves multiple organizational and technical problems, as a team of 4 works together on a single backend codebase.

## In of scope

Users would have their own profiles in the app, of which would provide them with weekly study tasks dependant on their study habits \(hours per day, weekends free time, break day, catching up, revision week\), without much input from the users themselves unless changed through the settings defined as default.

The output of such at the end of each week displays what they have been late on, and would carry over and notify the user of these changes, along with stronger notification pushed towards administrators if direct intervention is needed. A dashboard allows the user and authorized personal to check how each subject is progressing, although most data is personal and does not reflect how they do unless they are really behind on the expected schedule of a certain subject.

All data gathered relies on student's trust to follow proper guidelines on effective study methods, intervention requires school/institute/personal involvement in the progress of student. The app is after all, a platform that requires willingness of participation with a hint of behaviorism through simple UX/UI concepts and design.

## Out of scope

The app demonstrates what is possible with Jadwallah as a social and educational app, due to technical and prohibitive restrictions it wont be:

* The assured way to get good grades.
* A measure of understanding.
* The best method to organize study time.
* The most accurate model of how you are doing.
* A mean of determining IQ.
* Fool proof app from tampering and misuse.

## Functional Requirements

Includes all requirements to make the app up and running as intended. such:

1. Landing page as a guide to using the app.
2. Separate pages for each feature, including the login, jadwalli, chat and dashboard pages.
3. A template that would define how the scheduling works with which input, in terms of subject tasks, study method \(relaxed, compressed, variety, revision\) and personal preferences when found affecting the study habit.
4. An algorithm that would define weekly study tasks, and carries over what is left next week and so.
5. Nosql storage that would help track past behaviours and adjust accordingly, and maintain up to date dashboards.
6. Error handling to prevent unintended behaviors.

### The basic dataflow

It starts with landing &gt;&gt;&gt; login &gt;&gt;&gt; input preferences &gt;&gt;&gt; scheduling &gt;&gt;&gt; output data &gt;&gt;&gt; dashboard. Along with a separate chat and notification service that is both meaningful and useful.

## Non-Functional Requirements

* React native deployment is considered, although the preference is a functional responsive react web app.
* User UI/UX is considered for minimal required clicking and editing, with the ability to provide template and editable solutions as the base experience.
* Readability of code is considered with unified eslint, and all modularity considerations is first handled before any code is written through a starter code.
* Security measures by encrypting the password before storage using bcrypt, and implementing latest token and cookie creation method using JWT and passing it to the header with expirations.
* Software deployment is done through a managed git process and a testing branch, along with heroku app deployment to the web and a tracking version update for minor and major changes.

Open source, complements from the team on github.


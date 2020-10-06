---
description: >-
  Here lies all HTTP requests relating to students, may you find the path to be
  enlightening.
---

# Student routes

Including Nosql database, multiple schemas, socket.io notification systems.

{% api-method method="get" host="http://localhost:3000" path="/dashboard" %}
{% api-method-summary %}
Dashboard
{% endapi-method-summary %}

{% api-method-description %}
This endpoint allows you to check on all students, which allows you to store your courses information, the hours spent and study progress in the cloud and allows you to access it in any device.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authentication" type="string" required=true %}
Because only students who started joined the fun, and started studying gets their own dashboard!
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Here is what you have studied.
{% endapi-method-response-example-description %}

```
[
    {
        "name": "Physics",
        "hours": 150,
        "spentHours": 100,
        "progress": 40
    },
    {
        "name": "Mathematics",
        "hours": 100,
        "spentHours": 25,
        
        ...etc
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=500 %}
{% api-method-response-example-description %}
You have not started studying yet, for real.
{% endapi-method-response-example-description %}

```
You have not started studying yet!
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% code title="dashboard.js" %}
```text
//To get the progress and other statistics
router.get('/dashboard', bearerAuth, getDashboard);
```
{% endcode %}

{% api-method method="get" host="http://localhost:3000" path="/notification" %}
{% api-method-summary %}
Notification
{% endapi-method-summary %}

{% api-method-description %}
This endpoint allows students to check on themselves. It retrieves all notifications related to the student, some of the notifications are just a feedback about the progress the student has made.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="Authentication" type="string" required=true %}
Because each notification concerns each student, and each only!
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Because it is only about the student and for the student.
{% endapi-method-response-example-description %}

```
"Welcome back, lets get started"
"You have progressed 10% today!"
"We missed you yesterday, did any progress happen offline?"
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

```text
// this notification is set as a reminder for the student
  const notification = {
    text: 'Hey, Are you there?! We think you might be beyond schedule',
    time: new Date() ,
    student_id : student,
  };
```


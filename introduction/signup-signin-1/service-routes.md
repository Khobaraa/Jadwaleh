---
description: >-
  Here lies all HTTP requests relating to side services, may you find the path
  to be pleasing.
---

# Service routes

{% api-method method="get" host="http://localhost:3000" path="/chat" %}
{% api-method-summary %}
Get Chat
{% endapi-method-summary %}

{% api-method-description %}
This endpoint allows you to get and send free chatters.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authentication" type="string" required=true %}
Authentication token to track down who is using chattering away.
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-form-data-parameters %}
{% api-method-parameter name="Subject" type="string" required=true %}
Because study requires study related chat!
{% endapi-method-parameter %}
{% endapi-method-form-data-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Cake successfully retrieved.
{% endapi-method-response-example-description %}

```
"User 1 logged in"

User 2: Hey User1!

   Hello User2 :User1
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=401 %}
{% api-method-response-example-description %}
Because you can't enter, what you have not joined.
{% endapi-method-response-example-description %}

```
Error: Invalid Headers
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://localhost:3000" path="/wall" %}
{% api-method-summary %}
Get Wall
{% endapi-method-summary %}

{% api-method-description %}
A personal space of motivating talks and public messaging!
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
This is where each student wall exists, write along!
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-headers %}
{% api-method-parameter name="Authorization" type="string" required=true %}
Because it would be bad if anyone could write on the wall.
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
"Hey! Keep up the good work!"
"Wow, you have been studying like mad"
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}




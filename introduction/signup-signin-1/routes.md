---
description: >-
  Here lies all HTTP requests relating to users, may you find the path to be
  direct.
---

# User routes

{% api-method method="get" host="http://localhost:3000" path="/users" %}
{% api-method-summary %}
Get Users
{% endapi-method-summary %}

{% api-method-description %}
This is where all users live, digitally speaking.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=false %}
ID of the exact student if exists, otherwise gets all students.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-headers %}
{% api-method-parameter name="Authentication" type="string" required=true %}
Authentication token make sure only authorized roles get to do stuff.
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-query-parameters %}
{% api-method-parameter name="name" type="string" %}
Returns a matching student name/s.
{% endapi-method-parameter %}
{% endapi-method-query-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
All users successfully retrieved, or one user if specified in the params with their ID or query with username/email.
{% endapi-method-response-example-description %}

```
{
    "count": 5,
    "results": [
        {
            users info x5
        }
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=500 %}
{% api-method-response-example-description %}
No input matches the list
{% endapi-method-response-example-description %}

```
Error: User not found
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="put" host="http://localhost:3000" path="/users/:id" %}
{% api-method-summary %}
Update User
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=false %}
Just that student, to edit.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-headers %}
{% api-method-parameter name="Authentication" type="string" required=true %}
For the same reason as above!
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=202 %}
{% api-method-response-example-description %}
All good, nice haircut.
{% endapi-method-response-example-description %}

```
{    
    "Update successful",
    {
        new userinfo
    }
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=500 %}
{% api-method-response-example-description %}
When user is not found, or is updated with bad data/enum
{% endapi-method-response-example-description %}

```
Error: User not found
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="delete" host="http://localhost:3000" path="/users/:id" %}
{% api-method-summary %}
Delete User
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="ID" type="string" required=true %}
Just that student, to delete.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-headers %}
{% api-method-parameter name="Authentication" type="string" required=true %}
For the same reason 2 levels above!
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=202 %}
{% api-method-response-example-description %}
When you remove that student.
{% endapi-method-response-example-description %}

```
"User deleted, technically forever"
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=500 %}
{% api-method-response-example-description %}
Because as always, id might not exist at all.
{% endapi-method-response-example-description %}

```
Error: user not found
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}


---
description: signup and signin (request&response)
---

# SignUp-SignIn

{% api-method method="post" host="http://localhost:3000" path="/signup" %}
{% api-method-summary %}
Signup
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="role" type="string" required=true %}
the acsess of user
{% endapi-method-parameter %}

{% api-method-parameter name="password" type="string" required=true %}
password
{% endapi-method-parameter %}

{% api-method-parameter name="username" type="string" required=true %}
 user name 
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Cake successfully retrieved.
{% endapi-method-response-example-description %}

```
{    "name": "Cake's name",    "recipe": "Cake's recipe name",    "cake": "Binary cake"}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}
Could not find a cake matching this query.
{% endapi-method-response-example-description %}

```
{    "message": "Ain't no cake like that."}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}




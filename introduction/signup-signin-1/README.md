---
description: Beginning with authentication!
---

# Routes

{% api-method method="post" host="http://localhost:3000" path="/signup" %}
{% api-method-summary %}
Sign-up
{% endapi-method-summary %}

{% api-method-description %}
This is where you join the fun!
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="email" type="string" required=true %}
Username's email
{% endapi-method-parameter %}

{% api-method-parameter name="username" type="string" required=true %}
Username's username
{% endapi-method-parameter %}

{% api-method-parameter name="password" type="string" required=true %}
Username's password
{% endapi-method-parameter %}

{% api-method-parameter name="role" type="string" required=true %}
role picked from enum of \[admin, teacher, student\]
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
User signup is successful!
{% endapi-method-response-example-description %}

```
{
    "_id": "5f7cdc2dce224b4e96b94a09",
    "email": "odai@thismail.com",
    "username": "odai21",
    "password": "$2b$0***************VRZgCaWFlzKjG5******zr1cy",
    "role": "user",
    "__v": 0
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=500 %}
{% api-method-response-example-description %}
User either has an invalid input.
{% endapi-method-response-example-description %}

    "message":ValidationError: Users validation failed: role: `we` is not a valid enum value for path `role`."Ain't no cake like that."
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="http://localhost:3000" path="/signin" %}
{% api-method-summary %}
Sign-in
{% endapi-method-summary %}

{% api-method-description %}
This is where you verify that you had joined the fun and doing so again!
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-form-data-parameters %}
{% api-method-parameter name="username" type="string" required=false %}
Username's username
{% endapi-method-parameter %}

{% api-method-parameter name="password" type="string" required=false %}

{% endapi-method-parameter %}
{% endapi-method-form-data-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Returns user info with token for bearer authentication and cookie creation.
{% endapi-method-response-example-description %}

```
{
    "token": "eyJh********cCI6IkpXVCJ*********IsImFjdGlvbnMiOlsicmVhZCJdLCJ1c2VySWQiOiI1ZjdjZGMyZGNlMjI0YjRlOTZiOTRhMDkiLCJpYXQiOjE2MDIwMTg5NDF9.3Ik0I1FP3ig-PkWBipMKY4wYZQFsOQVGywwHSyg5BTw",
    "user": {
        "_id": "5f7cdc2dce********9",
        "username": "odai21",
        "password": "$2b$05$9oQf*************5KzF5dx4ZY6/zr1cy",
        "role": "user",
        "__v": 0
    }
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=500 %}
{% api-method-response-example-description %}
for other bad or not matching info.
{% endapi-method-response-example-description %}

```
Error: Bad Request 
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="http://localhost:3000" path="/" %}
{% api-method-summary %}
Gmail OAuthentication
{% endapi-method-summary %}

{% api-method-description %}
Allows user to login with a click in the homepage, if the email matched the database of users.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-form-data-parameters %}
{% api-method-parameter name="Click" type="boolean" required=false %}
Click me to redirect to google's OAuth
{% endapi-method-parameter %}
{% endapi-method-form-data-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
returns the token with user encoded info if matches the database info.
{% endapi-method-response-example-description %}

```
"token": "eyJh********cCI6IkpXVCJ*********IsImFjdGlvbnMiOlsicmVhZCJdLCJ1c2VySWQiOiI1ZjdjZGMyZGNlMjI0YjRlOTZiOTRhMDkiLCJpYXQiOjE2MDIwMTg5NDF9.3Ik0I1FP3ig-PkWBipMKY4wYZQFsOQVGywwHSyg5BTw"
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=500 %}
{% api-method-response-example-description %}
or an error if you are not affiliated with google!
{% endapi-method-response-example-description %}

```text
Error: Bad Request
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}


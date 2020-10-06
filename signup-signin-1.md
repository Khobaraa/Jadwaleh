---
description: signup and signin (request&response)
---

# SignUp-SignIn

{% api-method method="post" host="http://localhost:3000" path="/signup" %}
{% api-method-summary %}
Signup
{% endapi-method-summary %}

{% api-method-description %}
sign up to the website for a new user
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
{
    "_id": "5f7cd6aefb247c17d7d95c12",
    "username": "osama2",
    "password": "$2b$05$wXU0bfxU93fm/jOVzEtYn.I.SoEP5XF5F9CK/P12czQ44nZ0oqvcW",
    "role": "admin",
    "__v": 0
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}
Could not find a cake matching thi404
{% endapi-method-response-example-description %}

```
404 NOT FOUND !!
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="http://localhost:3000/" path="signin" %}
{% api-method-summary %}
SignIn
{% endapi-method-summary %}

{% api-method-description %}
sign in to the website for the existing user
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="Username" type="string" required=true %}
username
{% endapi-method-parameter %}

{% api-method-parameter name="Password" type="string" required=true %}
password
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlhaHlhNCIsImFjdGlvbnMiOlsicmVhZCIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSJdLCJ1c2VySWQiOiI1ZjdiODY1YzBlOTQ5NjYyYzBhZWUyNzAiLCJpYXQiOjE2MDIwMTcwMDB9.5GrZBcBYuuBm_7ToaciEj2wWljcrr98oIf8AwAq6cfI",
    "user": {
        "_id": "5f7b865c0e949662c0aee270",
        "username": "yahya4",
        "password": "$2b$05$5sf8HjfkuunkhFFtOA/kBuVUgdt0M9UZktxhLeo8dU.G//XbUQ65q",
        "role": "admin",
        "__v": 0
    }
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="http://localhost:3000" path="/users" %}
{% api-method-summary %}
Bearer Authantaction 
{% endapi-method-summary %}

{% api-method-description %}
get all users signing in 
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="token" type="string" required=true %}
token represent the  users we have 
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
    "count": 4,
    "results": [
        {
            "_id": "5f7b865c0e949662c0aee270",
            "username": "yahya4",
            "password": "$2b$05$5sf8HjfkuunkhFFtOA/kBuVUgdt0M9UZktxhLeo8dU.G//XbUQ65q",
            "role": "admin",
            "__v": 0
        },
        {
            "_id": "5f7c4390ea61590779983efe",
            "username": "osama",
            "password": "$2b$05$HyNPl2deFptNPy4TOdLSXehocVx85wGcIBV0jaJ/MBDEv544drxcq",
            "role": "admin",
            "__v": 0
        },
        {
            "_id": "5f7ccdd6fd2bcb177b7348d7",
            "username": "osama1",
            "password": "$2b$05$FMTJ9VVEnCYi350RZyxiVOHC/6gAbcu2.QF15LkF3caLGJxaO.14G",
            "role": "admin",
            "__v": 0
        },
        {
            "_id": "5f7cd6aefb247c17d7d95c12",
            "username": "osama2",
            "password": "$2b$05$wXU0bfxU93fm/jOVzEtYn.I.SoEP5XF5F9CK/P12czQ44nZ0oqvcW",
            "role": "admin",
            "__v": 0
        }
    ]
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}


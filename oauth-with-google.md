---
description: show third party login using Google account
---

# Oauth with Google

{% api-method method="get" host="https://localhost:3000/" path="oauth" %}
{% api-method-summary %}

{% endapi-method-summary %}

{% api-method-description %}
Redirect "https://accounts.google.com/o/oauth2/v2/auth" to our localhost to make the third party login .
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
return token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbWRvdWg0ODZAZ21haWwuY29tIiwiaWF0IjoxNjAyMDE5NzI0fQ.Cdsx1f9\_ANjw-hGp6uoVXacTLjtf-LHRUc9e\_E-9YeU"  
this result after using JWT encoded 
{% endapi-method-response-example-description %}

```
{
  "username": "mamdouh486@gmail.com",
  "iat": 1602019724
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

![](.gitbook/assets/image.png)


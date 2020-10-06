---
description: 'Including Nosql database, multiple schemas, socket.io notification systems.'
---

# Data Pipeline
## Getting student dashboard

This application allows you to store your courses information, the hours spent and study progress in the cloud and allows you to access it in any device.

{% code title="dashboard.js" %}
```bash
//To get the progress and other statistics
router.get('/dashboard', bearerAuth, getDashboard);
```
{% endcode %}

{% api-method method="get" host="http://localhost:3000" path="/" %}
{% api-method-summary %}
Dashboard
{% endapi-method-summary %}

{% api-method-description %}
This method will send a request to the server to fitch the data needed from the database, and do some functionality, then send a response.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="" type="string" required=false %}

{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
The response will get me courses data from the database and then implement some methods to get the right statistics.
{% endapi-method-response-example-description %}

```
{
        "name": "Physics",
        "hours": 110,
        "spentHours": 50,
        "progress": 45%
    },
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}


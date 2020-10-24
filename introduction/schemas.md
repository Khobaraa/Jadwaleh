---
description: >-
  Starting with the user schema, each user would have the following schemas
  attached!
---

# Schemas

## User Schema

| user | type | required |
| :--- | :--- | :--- |
| email | string | true |
| username | string | true |
| password | string | true |
| role | string | true |

## History/Template Schema

| course | type | required |
| :--- | :--- | :--- |
| student\_id | number | true |
| name | string | true |
| expectedHours | number | false |
| noOfChapters | number | false |
| isCompleted | boolean | false |
| chapters | array | true |
| name | string | false |
| duration | number | false |
| state | string | true |

## Weekly Schema

| week | type | required |
| :--- | :--- | :--- |
| number | number | true |
| totalHoursWeek | number | false |
| day | array | true |
| number | number | true |
| totalHoursDay | number | false |
| topics | array | true |
| name | string | false |
| totalHours | number | false |
| completed | number | false |

## Notification

| notification | type | required |
| :--- | :--- | :--- |
| text | string | true |
| time | Date\(\) | false |
| student\_id | string | true |

## Chat Schema

| Field | type | Required |
| :--- | :--- | :--- |
| username | String | true |
| time | String | true |
| unixTime | Number | true |
| room | String | true |
| text | String | true |

## Wall Schema

| Filed  | type | Required |
| :--- | :--- | :--- |
| ownerId | String | true |
| unixTime | Number | true |
| text | String | true |


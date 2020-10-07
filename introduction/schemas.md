---
description: >-
  Starting with the user schema, each user would have the following schemas
  attached
---

# Schemas

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

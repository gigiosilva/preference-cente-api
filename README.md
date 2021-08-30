# Preference Center API

This is the Preference Center API

## Starting Server

- [Install Docker](https://www.docker.com/products/docker-desktop/)
- Clone this repo
- Run `yarn dev` or `docker compose up` on your terminal

## API info
* The base URL is: **http://localhost:3000/api**
* All endpoint returns a JSON containing an Object or an Array of Objects.

## USER Route


## Get Users

```
GET /users
```
Retrieve all users from database.

**Response Sample:**
```json
[
  {
    "id": "00000000-0000-0000-0000-000000000000",
    "email": "valid@email.com",
    "consents": []
  },
  {
    "id": "00000000-0000-0000-0000-000000000001",
    "email": "valid@email.com",
    "consents": [
      {
        "id": "email_notifications",
        "enabled": false
      },
      {
        "id": "sms_notifications",
        "enabled": true
      }
    ]
  },
  {
    ...
  }
]
```

## Create User

```
POST /users
```
Creates a new user in database.

**Request Body Details:**

Name | Type | Required | Description
------------ | ------------ | ------------ | ------------
email | STRING | YES | An unique valid email

**Request Body Sample:**
```json
{
  "email": "validunique@email.com",
}
```

**Response Sample:**
```json
{
  "email": "validunique@email.com",
  "id": "00000000-0000-0000-0000-000000000000",
}
```

### Get User By ID
```
GET /users/:idUser
```
Retrieve one user by its ID if exists.

**Request Parameters:**

Name | Type | Required | Example
------------ | ------------ | ------------ | ------------
idUser | STRING | YES | /users/00000000-0000-0000-0000-000000000000

**Response Sample:**
```json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "email": "valid@email.com",
  "consents": [
    {
      "id": "email_notifications",
      "enabled": false
    },
    {
      "id": "sms_notifications",
      "enabled": true
    }
  ]
}
```

### Delete User By ID
```
DELETE /users/:idUser
```
Delete one user by its ID if exists.

**Request Parameters:**

Name | Type | Required | Example
------------ | ------------ | ------------ | ------------
idUser | STRING | YES | /users/00000000-0000-0000-0000-000000000000

**Response Sample:**
```json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "message": "User deleted"
}
```

## EVENT Route

## Create Consent Event

```
POST /events
```
Creates a consent change event from specific user.

**Request Body Details:**

Name | Type | Required | Description
------------ | ------------ | ------------ | ------------
user.id | STRING | YES | User that generated the event
consents.id | STRING | YES | Consent ID representing email or sms notification
consents.enabled | BOOLEAN | YES | User consent decision to enable or not

**Request Body Sample:**
```json
{
  "user": {
    "id": "00000000-0000-0000-0000-000000000000"
  },
  "consents": [
    {
      "id": "email_notifications",
      "enabled": false
    },
    {
      "id": "sms_notifications",
      "enabled": true
    }
  ]
}
```

**Response Sample:**
```json
{
  "idUser": "00000000-0000-0000-0000-000000000000",
  "data": {
    "user": {
      "id": "00000000-0000-0000-0000-000000000000"
    },
    "consents": [
      {
        "id": "email_notifications",
        "enabled": true
      },
      {
        "id": "sms_notifications",
        "enabled": true
      }
    ]
  },
  "date": "2021-08-28T12:24:35.869Z",
  "id": "00000000-0000-0000-0000-000000000000"
}
```
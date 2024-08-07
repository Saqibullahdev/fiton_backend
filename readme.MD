# This repository contains backends code for fiton gym website

## The code is written in javascript and uses node js framework

## Installation

1. Clone the repository using the following command

```bash
git clone https://github.com/Saqibullahdev/fiton_backend.git
```

2. Install the dependencies using the following command

```bash
npm install
```

3. Run the server using the following command

```bash
node index.js
```

4. The server will start running on port 3000

## Description



1. The backend is divided into three roles: Admin, Client, and Trainer.
2. The admin can signup, login, and verify the trainer.
3. The client can signup, login, and logout.
4. The trainer can signup, login, and logout.
5. The admin can verify the trainer.
6. The client can make a post request to the trainer.
7. The trainer can see the list of clients who have made a post request to him/her.
8. The admin can see the list of trainers who have been verified.
9. The admin can see the list of clients who have made a post request to the trainer.
10. The client can see the list of trainers who have been verified.

## Special Features

- Modern `MVC` architecture is used in this project.
- Robust and secure authentication system using JWT and Argon2.
- Custom Error Handling for the admin, client, and trainer.
- Connecting and `disconnection` of `database` connection in standard way

## Technologies Used

1. Node.js
2. Express.js
3. MongoDB
4. Mongoose
5. JWT
6. Argon2
7. Cookie-parser

## Folder Structure

1. The `models` folder contains the schema for the admin, client, and trainer.
2. The `routes` folder contains the routes for the admin, client, and trainer.
3. The `controllers` folder contains the controllers for the admin, client, and trainer.
4. The `services` folder contains the business logic and database operation for the admin, client, and trainer.
5. The `middlewares` folder contains the middleware for the admin, client, and trainer.
6. The `utils` folder contains the utility functions for the admin, client, and trainer.
7. The `config` folder contains the configuration database.
8. The `errors` folder contains the custom error handling for the admin, client, and trainer.

## API Endpoints

### Admin Endpoints

1. ## Admin Signup

1. POST
``localhost:3000/api/v1/admin/create``  
 request body:

```json
{
  "username": "saqib_ullah",
  "email": "saqib@example.com",
  "password": "securePassword123",
}
```

2. POST 
``localhost:3000/api/v1/admin/login``
Request Body:

```json
{
  "email": "saqib@gmail.com",
  "password": "password"
}
```

- when admin is logged in,a jwt token by name `admin_token` is set in cookie which is used to authenticate the admin for further requests.

3. GET `localhost:3000/api/v1/admin/isloggedin`

- this endpoint is used to check if the admin is logged in or not.

### Client Endpoints

1. POST localhost:3000/api/v1/client/create

Request Body:

```json
{
  "fullname": "osama",
  "email": "osama@example.com",
  "phone_number": "123-456-7890",
  "password": "securePassword123",
  "gender": "male",
  "date_of_birth": "1990-01-01T00:00:00.000Z",
  
}
```

Note: The `Posts` array is empty by default. It will be populated when the client makes a post request.

2. POST localhost:3000/api/v1/client/login

Request Body:

```json
{
  "email": "saqib@gmil.com",
  "password": "password"
}
```

when client is logged in,a jwt token by name `client_token` is set in cookie which is used to authenticate the client for further requests.

3. POST `localhost:3000/api/v1/client/logout`

- this endpoint is used to logout the client and remove the `jwt token `from the cookie.

4. GET `localhost:3000/api/v1/client/isloggedin`

- this endpoint is used to check if the client is logged in or not.
- if the client is logged in, it will return the client details otherwise it will return an error message.
- base on the response, the client can be redirected to the login page or the dashboard page.
- so from frontend, we can check if the client is logged in or not and redirect the client to the appropriate page.

### Trainer Endpoints

1. POST `localhost:3000/api/v1/trainer/create`

Request Body:

```json
{
  "fullname": "osama",
  "email": "osama@example.com",
  "phone_number": "123-456-7890",
  "password": "securePassword123",
  "gender": "male",
  "date_of_birth": "1985-05-15T00:00:00.000Z",
  "role": "trainer",
  "expertise": "Yoga",
  "certification": "Certified Yoga Instructor",
  "experience": "5 years",
  "availability": "Weekdays 9am-5pm",
  "biography": "Experienced yoga instructor with a passion for holistic wellness.",
  "training_locations": "New York, NY",
}
```

Bydefault, the `isVerified` field is set to false. It will be updated to true when the admin verifies the trainer.

2- POST
`localhost:3000/api/v1/trainer/login`

Request Body:

```json
{
  "email": "test@gmail.com",
  "password": "password"
}
```

when trainer is logged in,a jwt token by name `trainer_token` is set in cookie which is used to authenticate the trainer for further requests.

3. POST ``localhost:3000/api/v1/trainer/logout``

- this endpoint is used to logout the trainer and remove the `jwt token `from the cookie.

4. GET
   `localhost:3000/api/v1/trainer/isloggedin`

- this endpoint is used to check if the trainer is logged in or not.
- if the trainer is logged in, it will return the trainer details otherwise it will return an error message.
- base on the response, the trainer can be redirected to the login page or the dashboard page.
- so from frontend, we can check if the trainer is logged in or not and redirect the trainer to the appropriate page.

5. PUT `localhost:3000/api/v1/trainer/verify/:id`

- this endpoint is used by the admin to verify the trainer.
- from admin dashboard this will in turn update the `isVerified` field of the trainer to true.
- trainer is verified according to qualifications and experience.this is done by the admin from dashboard
  when the trainer is verified, the trainer can be seen in the list of trainers and can be assigned to the clients.

- the admin click from frontend click on verify and `id` of that trainer is passed to this endpoint.

example:

```javascript
fetch(`http://localhost:3000/api/v1/trainer/verify/${id}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});
```

- when succussfully verified, the trainer will be shown in the list of trainers and can be assigned to the clients.

6. DELETE
 `localhost:3000/api/v1/trainer/delete/:id`

- This endpoint is used by the admin to delete the trainer from dashboard when the trainer is not qualified or not experienced.

7- GET
 `localhost:3000/api/v1/trainer/unverified`

- this endpoint is used to get the list of trainers who are `not verified` by the admin.
- from there admin can `verify` the trainer or `delete` the trainer.

8- GET
 `localhost:3000/api/v1/trainer`

- this endpoint is used to get the list of trainers who are `verified` by the admin.

### Post Request Endpoints

- these are those endpoints which are used by the client to make a post request to the trainer.

### make a post request to the trainer

1. POST `localhost:3000/api/v1/post/create`

Request Body:

```json
{
  "title": "Looking for a Personal Trainer",
  "description": "I am looking for a personal trainer to help me improve my overall fitness.",
  "budget": 500,
  "availability": "Weekends",
  "location": "San Francisco, CA",
  "durationOfTraining": "3 months",
  "fitnessLevel": "Intermediate",
  "healthConditionsOrInjuries": "None",
  "email": "client@example.com",
  "phone": "123-456-7890",
  "postDate": "2024-06-01T00:00:00.000Z",
  "expirationDate": "2024-07-01T00:00:00.000Z"
}
```

Note:

- this endpoint is used by the client to make a post request to the trainer `only logged in clients` can make a post request to the trainer.

- client_id is not passed in the request body because the client is already logged in and the client_id is extracted from the jwt token.

- comments array is empty by default. It will be populated when the client or trainer makes a comment.

### comment on the post request

2. POST `localhost:3000/api/v1/post/comment/:id`

Request Body:

```json
{
  "comment": "I am interested in this opportunity. Please let me know if you are still looking for a trainer."
}
```

- this endpoint is used by the client or trainer to make a comment on the post request.
- the `id` of the post request is passed in the url and the comment is passed in the request body.
- client_id or trainer_id is not passed in the request body because the client or trainer is already logged in and the client_id or trainer_id is extracted from the jwt token.

- when the client or trainer makes a comment, the comment is added to the comments array of the post request.

### reply to the comment

3. POST `localhost:3000/api/v1/post/reply/:id`

Request Body:

```json
{
  "reply": "Yes, I am still looking for a trainer. Please send me your resume and availability."
}
```

- this endpoint is used by the client or trainer to reply to the comment.
- the `id` of the post request is passed in the url and the reply is passed in the request body.
- client_id or trainer_id is not passed in the request body because the client or trainer is already logged in and the client_id or trainer_id is extracted from the jwt token.
- when the client or trainer makes a reply, the reply is added to the replies array of the comment.

### Get the list of post requests

4. GET `localhost:3000/api/v1/post`

- this endpoint is used to get the list of post requests made by the clients.
- the list of post requests is displayed on the trainer dashboard.

### response of this endpoint looks like this:

```json
{
  "_id": "667fefeca319a64e66c8f0b2",
  "client_id": {
    "_id": "667f9d1870d3d25fa47db2c6",
    "fullname": "John Doe",
    "email": "john.doe@example.com"
  },
  "title": "Personal Training Session",
  "description": "Looking for a personal trainer for weekly sessions.",
  "budget": 50,
  "availability": "Weekends",
  "location": "New York, NY",
  "durationOfTraining": "1 hour",
  "fitnessLevel": "Beginner",
  "healthConditionsOrInjuries": "None",
  "email": "client@example.com",
  "phone": "123-456-7890",
  "postDate": "2024-06-29T00:00:00.000Z",
  "expirationDate": "2024-07-29T00:00:00.000Z",
  "comments": [
    {
      "_id": "668004c6e8ca91bbd3ea5e09",
      "comment": "testing",
      "client_id": {
        "_id": "667f9d1870d3d25fa47db2c6",
        "fullname": "John Doe",
        "email": "john.doe@example.com"
      },
      "trainer_id": null,
      "replies": [
        {
          "_id": "6680e1cceefd0442de3b62e2",
          "reply": "testing",
          "client_id": {
            "_id": "667f9d1870d3d25fa47db2c6",
            "fullname": "John Doe",
            "email": "john.doe@example.com"
          },
          "trainer_id": null
        }
      ]
    }
  ],
  "createdAt": "2024-06-29T11:28:44.307Z",
  "updatedAt": "2024-06-29T12:57:42.624Z",
  "__v": 2
}
```

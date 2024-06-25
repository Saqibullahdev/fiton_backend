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

this is backend code for a gym website ,which has three roles admin,client and trainer.
those who want to join the gym can signup as client and can make a post request to the trainer.
the trainer can see the list of clients who have made a post request to him/her.
the admin can verify the trainer and can see the list of trainers who have been verified.
the client make post request to the trainer and can see the list of trainers who have been verified.
the both can chat with each other through comments.
client and trainer can reply to each other comments.

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
3. The  `services` folder contains the business logic and database operation for the admin, client, and trainer.
4. The `middlewares` folder contains the middleware for the admin, client, and trainer.
5. The `utils` folder contains the utility functions for the admin, client, and trainer.
6. The `config` folder contains the configuration database.
7. The `errors` folder contains the custom error handling for the admin, client, and trainer.






## API Endpoints
### Admin Endpoints
1. ## Admin Signup

1. POST localhost:3000/api/v1/admin/signup
request body:
```json
{
  "username": "admin_user",
  "email": "admin@example.com",
  "password": "securePassword123",
  "role": "admin"
}
```    


2. POST localhost:3000/api/v1/admin/login

Request Body:
```json
{
    "email": "",
    "password": "password"
}
```

- when admin is logged in,a jwt token by name `admin_token` is set in cookie which is used to authenticate the admin for further requests.


### Client Endpoints

1. POST localhost:3000/api/v1/client/create

Request Body:
```json
{
  "fullname": "John Doe",
  "email": "john.doe@example.com",
  "phone_number": "123-456-7890",
  "password": "securePassword123",
  "gender": "male",
  "date_of_birth": "1990-01-01T00:00:00.000Z",
  "role": "client",
  "posts": []
}
```

Note: The `Posts` array is empty by default. It will be populated when the client makes a post request.

2. POST localhost:3000/api/v1/client/login

Request Body:
```json
{
    "email": "",
    "password": "password"
}
```

when client is logged in,a jwt token by name `client_token` is set in cookie which is used to authenticate the client for further requests.

3. POST localhost:3000/api/v1/client/logout

- this endpoint is used to logout the client and remove the `jwt token `from the cookie.


4. POST localhost:3000/api/v1/client/isloggedin

- this endpoint is used to check if the client is logged in or not.
- if the client is logged in, it will return the client details otherwise it will return an error message.
- base on the response, the client can be redirected to the login page or the dashboard page.
- so from frontend, we can check if the client is logged in or not and redirect the client to the appropriate page.


### Trainer Endpoints

1. POST localhost:3000/api/v1/trainer/create

Request Body:
```json
{
  "fullname": "Jane Doe",
  "email": "jane.doe@example.com",
  "phone_number": "123-456-7890",
  "password": "securePassword123",
  "gender": "female",
  "date_of_birth": "1985-05-15T00:00:00.000Z",
  "role": "trainer",
  "expertise": "Yoga",
  "certification": "Certified Yoga Instructor",
  "experience": "5 years",
  "availability": "Weekdays 9am-5pm",
  "biography": "Experienced yoga instructor with a passion for holistic wellness.",
  "training_locations": "New York, NY",
  "isVerified": false
}

```

Bydefault, the `isVerified` field is set to false. It will be updated to true when the admin verifies the trainer.

2- POST localhost:3000/api/v1/trainer/login

Request Body:
```json
{
    "email": "",
    "password": "password"
}
```

when trainer is logged in,a jwt token by name `trainer_token` is set in cookie which is used to authenticate the trainer for further requests.

3. POST localhost:3000/api/v1/trainer/logout

- this endpoint is used to logout the trainer and remove the `jwt token `from the cookie.

4. POST localhost:3000/api/v1/trainer/isloggedin

- this endpoint is used to check if the trainer is logged in or not.
- if the trainer is logged in, it will return the trainer details otherwise it will return an error message.
- base on the response, the trainer can be redirected to the login page or the dashboard page.
- so from frontend, we can check if the trainer is logged in or not and redirect the trainer to the appropriate page.

5. POST localhost:3000/api/v1/trainer/verify/:id

- this endpoint is used by the admin to verify the trainer.
- from admin dashboard this will in   turn update the `isVerified` field of the trainer to true.
- trainer is verified according to qualifications and experience.this is done by the admin from dashboard
when the trainer is verified, the trainer can be seen in the list of trainers and can be assigned to the clients.

- the admin click from frontend click on verify and `id` of that trainer is passed to this endpoint.

example:
```javascript
fetch(`http://localhost:3000/api/v1/trainer/verify/${id}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
    })

    ```
- when succussfully verified, the trainer will be shown in the list of trainers and can be assigned to the clients.    

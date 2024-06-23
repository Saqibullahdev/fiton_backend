#This repository contains backends code for fiton gym website
#The code is written in javascript and uses node js framework

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

## API Endpoints
### Admin Endpoints
1- ### Admin Signup

1. POST localhost:3000/api/v1/admin/signup
request body:
```json
{
    "name": "admin",
    "email": "",

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

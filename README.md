<div align="center">
  <h3 align="center">Audit Backend API</h3>

  <p align="center">
    This project for audit application build with Node.js, Express, Prisma, JWT, Nodemailer, and MySQL.
    <br/>
    <br/>
</div>

#### 🛠️ Tech Stack

The project is built using the following technologies:

- Programming Language: Node.js
- Framework: Express
- Database: MySQL, Prisma
- Middleware: JWT

#### 🚀 How to use

1. Clone the repository
2. Install dependencies
3. Create a .env file and add the following variables:

```
PORT=3000
DATABASE_URL=mysql://root:root@localhost:3306/audit-db
JWT_SECRET=secret-key

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email
MAIL_FROM_NAME="Audit Application"
```

4. Build database with Prisma

```bash
npx prisma db push
```

5. Run seeder

```bash
npx prisma db seed
```

6. Run the server

```bash
node .
```

5. Open http://localhost:3000/api/... to use the API

#### 📋 API Contracts

The API contracts for this project are as follows:

- Register

  - Method: `POST`
  - URL: `/api/users/register`
  - Request Header:
    ```json
    {
      "Content-Type": "application/json"
    }
    ```
  - Request Body:
    ```json
    {
      "email": "raffyjo@gmail.com",
      "password": "12345678",
      "name": "Raffy"
    }
    ```
  - Response Body:
    ```json
    {
      "message": "Register success",
      "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE5MzE0ODk5LCJleHAiOjE2MTkyMTQ5OTk5fQ.1-4-5-6-7-8-9-0-1-2-3-4-5-6-7-8-9-0"
      }
    }
    ```

- Login

  - Method: `POST`
  - URL: `/api/users/login`
  - Request Header:
    ```json
    {
      "Content-Type": "application/json"
    }
    ```
  - Request Body:
    ```json
    {
      "email": "raffyjo@gmail.com",
      "password": "12345678"
    }
    ```
  - Response Body:

    ```json
    {
      "message": "Login success",
      "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE5MzE0ODk5LCJleHAiOjE2MTkyMTQ5OTk5fQ.1-4-5-6-7-8-9-0-1-2-3-4-5-6-7-8-9-0"
      }
    }
    ```

- Reset Password By Email

  - Method: `POST`
  - URL: `/api/users/reset-password`
  - Request Header:
    ```json
    {
      "Content-Type": "application/json"
    }
    ```
  - Request Body:
    ```json
    {
      "email": "raffyjo@gmail.com"
    }
    ```
  - Response Body:
    ```json
    {
      "message": "Reset password success",
      "data": true
    }
    ```

- Create Audit

  - Method: `POST`
  - URL: `/api/audits`
  - Request Header:
    ```json
    {
      "Content-Type": "application/json",
      "Authorization Type": "Bearer Token",
      "Authorization": "<JWT>"
    }
    ```
  - Request Body:
    ```json
    {
      "title": "Audit Keuangan 2025",
      "area": "KEUANGAN",
      "start_date": "2025-01-15 15:55:58",
      "close_date": "2025-01-15 15:55:58"
    }
    ```
  - Response Body:
    ```json
    {
      "message": "Create audit success",
      "data": {
        "id": 1,
        "title": "Audit Keuangan 2025",
        "area": "KEUANGAN",
        "start_date": "2025-01-15 15:55:58",
        "close_date": "2025-01-15 15:55:58"
      }
    }
    ```

- Update Audit

  - Method: `PUT`
  - URL: `/api/audits/:id`
  - Request Header:
    ```json
    {
      "Content-Type": "application/json",
      "Authorization Type": "Bearer Token",
      "Authorization": "<JWT>"
    }
    ```
  - Request Body:
    ```json
    {
      "title": "Audit Keuangan 2025",
      "area": "KEUANGAN",
      "start_date": "2025-01-15 15:55:58",
      "close_date": "2025-01-15 15:55:58"
    }
    ```
  - Response Body:
    ```json
    {
      "message": "Update audit success",
      "data": {
        "id": 1,
        "title": "Audit Keuangan 2025",
        "area": "KEUANGAN",
        "start_date": "2025-01-15 15:55:58",
        "close_date": "2025-01-15 15:55:58"
      }
    }
    ```

- Get All Audits By User

  - Method: `GET`
  - URL: `/api/audits`
  - Request Header:
    ```json
    {
      "Content-Type": "application/json",
      "Authorization Type": "Bearer Token",
      "Authorization": "<JWT>"
    }
    ```
  - Response Body:
    ```json
    {
      "message": "Get audits success",
      "data": [
        {
          "id": 1,
          "title": "Audit Keuangan 2025",
          "area": "KEUANGAN",
          "start_date": "2025-01-15 15:55:58",
          "close_date": "2025-01-15 15:55:58"
        },
        {
          "id": 2,
          "title": "Audit SDM 2025",
          "area": "SDM",
          "start_date": "2025-01-15 15:55:58",
          "close_date": "2025-01-15 15:55:58"
        }
      ]
    }
    ```

- Get All Audits By All User (Limit)

  - Method: `GET`
  - URL: `/api/audits/all?limit=2`
  - Request Header:
    ```json
    {
      "Content-Type": "application/json",
      "Authorization Type": "Bearer Token",
      "Authorization": "<JWT>"
    }
    ```
  - Response Body:
    ```json
    {
      "message": "Get audits success",
      "data": [
        {
          "id": 1,
          "title": "Audit Keuangan 2025",
          "area": "KEUANGAN",
          "start_date": "2025-01-15 15:55:58",
          "close_date": "2025-01-15 15:55:58"
        },
        {
          "id": 2,
          "title": "Audit SDM 2025",
          "area": "SDM",
          "start_date": "2025-01-15 15:55:58",
          "close_date": "2025-01-15 15:55:58"
        }
      ]
    }
    ```

- Error Response
  ```json
  {
    "message": "Error Message",
    "data": "Error Data"
  }
  ```

#### Database Schema

The database schema for this project is as follows:

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    name VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audits (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    area ENUM('KEUANGAN', 'SDM', 'OPERASIONAL', 'K3'),
    start_date DATETIME,
    close_date DATETIME,
    user_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### 📞 Contact or Ask Questions

For support or inquiries, please contact:

- Email: rafiteguh6@gmail.com
- Linkedin: https://www.linkedin.com/in/raffyjo

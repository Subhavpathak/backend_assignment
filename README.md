# 📝 Fullstack Auth & CRUD Assignment

## 🚀 Overview
This project is built as part of the **Backend Developer Intern Assignment**.  

It demonstrates a **secure, scalable REST API** with authentication, role-based access control (User/Admin), and CRUD operations for a secondary entity (`Tasks`). A **React frontend** is included to interact with the APIs.

**Key Features:**  
- JWT-based authentication  
- Role-based access (user/admin)  
- CRUD operations on tasks  
- API versioning (`/api/v1`)  
- Input validation and error handling  
- Swagger API documentation  
- Simple React.js frontend for testing  

---

## 🛠 Tech Stack

**Backend:**  
- Node.js + Express  
- MongoDB + Mongoose  
- JWT for authentication  
- bcrypt.js for password hashing  
- Swagger for API docs  

**Frontend:**  
- React.js (Create React App)  
- Axios for API requests  
- React Router for navigation  
- TailwindCSS for styling  

---


## ⚙️ Setup Instructions

### Backend
```bash
cd backend
cp .env.example .env   # configure your environment variables
npm install
npm run dev

### Frontend
cd frontend
cp .env.example .env   # configure API URL
npm install
npm start

### 🔑 Features Implemented

User Registration & Login (JWT authentication)

Role-based access (User/Admin)

CRUD APIs for tasks

Password hashing with bcrypt

API versioning /api/v1

Error handling & input validation

Swagger API documentation

React UI with:

Registration & Login

JWT-protected dashboard

CRUD operations

Display API success/error messages

### 🔒 Security & Scalability

JWT tokens securely handled

Input validation & sanitization

Modular project structure for scaling future modules

Ready for caching (Redis) or containerized deployment (Docker)


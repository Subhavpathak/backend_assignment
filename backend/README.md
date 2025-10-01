# Backend (Node.js + Express + MongoDB)

## Setup (local)
- copy `.env.example` to `.env` and configure values (MONGO_URI and JWT_SECRET)
- `npm install`
- `npm run dev` (requires nodemon) or `npm start`

API endpoints (versioned under `/api/v1`):
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- GET/POST/PUT/DELETE /api/v1/tasks
- GET /api/v1/users (admin only)
- API docs at /api-docs (Swagger UI)

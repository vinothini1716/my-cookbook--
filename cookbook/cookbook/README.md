Cookbook App (Fullstack)
========================

What's included:
- backend/: Node + Express + Mongoose API for favourites.
- frontend/: React app (basic) that talks to TheMealDB and backend.
- .env.sample in backend shows where to paste MONGO_URI.

How to run:
1. Backend:
   - cd backend
   - npm install
   - create .env from .env.sample and put your MongoDB URI
   - npm start

2. Frontend:
   - cd frontend
   - npm install
   - npm start

Notes:
- Replace public/logo.png and public/chatbot-logo.png with your logos.
- Backend CORS allows frontend at default ports in dev.

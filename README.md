# Workout Budyyy

A responsive workout tracker built with React, Context + useReducer, Express, MongoDB Atlas and Mongoose.

## Project structure

- `backend/` — Express REST API, Mongoose model, controllers and routes
- `frontend/` — React + Vite user interface and global workout state

## Requirements

- Node.js 18 or newer
- A MongoDB Atlas account and database connection string

## 1. Configure the backend

Open a terminal in the `backend` folder:

```bash
npm install
```

Copy `.env.example` to `.env` and replace the `MONGO_URI` value with your MongoDB Atlas connection string. Do not commit `.env` to GitHub.

Example:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/workout-budyyy?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
```

Start the API:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

## 2. Start the frontend

Open another terminal in the `frontend` folder:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

Optionally create `frontend/.env` to change the API URL:

```env
VITE_API_URL=http://localhost:5000/api/workouts
```

## REST API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/workouts` | Fetch workouts, latest first |
| POST | `/api/workouts` | Create a workout |
| DELETE | `/api/workouts/:id` | Delete a workout |

POST body example:

```json
{
  "title": "Chest",
  "load": 15,
  "reps": 30
}
```

Validation errors are returned with HTTP 400. Invalid IDs return HTTP 400 and missing workouts return HTTP 404.

## Notes

- MongoDB documents automatically receive `createdAt` and `updatedAt` timestamps.
- React Context and `useReducer` manage setting, adding and removing workouts.
- The frontend displays relative creation times and validation/API errors.
- Keep your Atlas credentials private. Add `.env` to `.gitignore` before pushing to GitHub.

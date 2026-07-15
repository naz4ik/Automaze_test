# TODO App

A full-stack TODO application built as a technical test task (Junior Full-Stack Developer).

🎥 **Demo video:** [Watch here](https://drive.google.com/file/d/1oduWDywYozCgSWrQh9LBsOxsKDoF-O-e/view?usp=sharing)

🔗 **Live demo:** _coming soon_

## Features

- Add, edit, and delete tasks
- Mark individual tasks as done / undone
- Mark all tasks as done / undone
- Delete all completed tasks
- Search tasks by title
- Filter tasks by status (all / done / undone)
- Assign priority to tasks (1–10)
- Sort tasks by priority (ascending / descending)
- Set a due date per task, with automatic **overdue** highlighting

## Tech Stack

**Backend** — `todo-backend/`
- Node.js + Express
- Sequelize ORM + PostgreSQL
- Vitest + Supertest (API tests)

**Frontend** — `todo-frontend/`
- Next.js + React + TypeScript
- Tailwind CSS + shadcn/ui

## Project Structure
.
├── todo-backend/     # Express API + PostgreSQL
└── todo-frontend/    # Next.js client

## Getting Started

### 1. Backend

```bash
cd todo-backend
npm install
```

Create a `.env` file:

```env
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_db
DB_NAME_TEST=todo_db_test
```

Create the `todo_db` (and `todo_db_test` for running tests) databases in PostgreSQL, then start the server:

```bash
npm run dev
```

Server runs on `http://localhost:4000`.

Run tests:

```bash
npm test
```

### 2. Frontend

```bash
cd todo-frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/tasks
```

Start the app:

```bash
npm run dev
```

App runs on `http://localhost:3000`.

## API Endpoints

| Method | Endpoint            | Description                     |
|--------|---------------------|----------------------------------|
| GET    | `/tasks`             | Get tasks (search, status, sort) |
| POST   | `/tasks/createTask`  | Create a task                    |
| PUT    | `/tasks/:id`         | Update a task                    |
| PUT    | `/tasks/:id/toggle`  | Toggle task done status          |
| PUT    | `/tasks/toggleAll`   | Toggle all tasks                 |
| DELETE | `/tasks/:id`         | Delete a task                    |
| DELETE | `/tasks/completed`   | Delete all completed tasks       |

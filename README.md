# Node Task Management

A full-stack task management application built with React.js frontend and Node.js backend.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- PostgreSQL (v12.0 or higher)
- Git

## Project Structure
```
Node_Task_Management/
├── frontend/               # React.js frontend application
│   └── task-management-frontend/
└── backend/               # Node.js backend application
```

## Local Setup Guide

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Node_Task_Management
```

### 2. Database Setup

1. Install PostgreSQL from [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
   - Keep default username as `postgres`
   - Set a password (remember this for later)
   - Keep default port as `5432`

2. Open pgAdmin (PostgreSQL GUI)
   - Click on "Servers" > PostgreSQL
   - Enter your password when prompted

3. Create Database
   - Right-click on `Databases`
   - Click `Create > Database`
   - Name it `task_manager`
   - Click `Save`

4. Create Tables
   - Expand `task_manager` database
   - Right-click on **Schemas > Tables**
   - Click `Query Tool`
   - Paste and run the following SQL:

```sql
Tables creation based on need
```

### 3. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the backend directory:
```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=task_manager
DB_PASSWORD=your_postgres_password
DB_PORT=5432
```

4. Start the backend server:
```bash
npm start
```
The backend server will run on `http://localhost:5000`

### 4. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend/task-management-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```
The frontend application will run on `http://localhost:3000`

## Running Both Applications

To run both frontend and backend simultaneously, you'll need to open two terminal windows:

Terminal 1 (Backend):
```bash
cd backend
npm start
```

Terminal 2 (Frontend):
```bash
cd frontend/task-management-frontend
npm start
```

## Dependencies

### Backend Dependencies
- express: Web framework
- cors: Cross-origin resource sharing
- body-parser: Request body parsing
- pg: PostgreSQL client
- bcrypt: Password hashing
- jsonwebtoken: JWT authentication
- dotenv: Environment variables management

### Frontend Dependencies
- react: UI library
- react-dom: React rendering
- react-scripts: Create React App scripts
- web-vitals: Performance metrics

## Development

- Backend API endpoints are available at `http://localhost:5000/api`
- Frontend development server runs on `http://localhost:3000`
- Make sure both servers are running for full functionality

## Testing the Setup

1. After setting up both frontend and backend, visit `http://localhost:5000/api/test-db` in your browser
2. If you see the current timestamp, your database connection is working correctly
3. Visit `http://localhost:3000` to access the frontend application

## Contributing.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request


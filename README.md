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

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a PostgreSQL database and update the database configuration in `index.js`

4. Start the backend server:
```bash
npm start
```
The backend server will run on `http://localhost:5000`

## Frontend Setup

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

### Frontend Dependencies
- react: UI library
- react-dom: React rendering
- react-scripts: Create React App scripts
- web-vitals: Performance metrics

## Development

- Backend API endpoints are available at `http://localhost:5000/api`
- Frontend development server runs on `http://localhost:3000`
- Make sure both servers are running for full functionality

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
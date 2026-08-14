# MERN CRUD Application

A full-stack CRUD application built with MongoDB, Express, React, and Node.js.

## Features

- Create, Read, Update, and Delete operations
- Frontend and Backend integration
- RESTful API
- Responsive UI

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend
- React
- Axios (for API calls)
- CSS/Bootstrap (for styling)

## Project Structure

```
crud/
├── server/                 # Backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── controllers/        # Business logic
│   ├── server.js          # Entry point
│   └── package.json
└── client/                # Frontend
    ├── src/
    │   ├── components/    # React components
    │   ├── pages/         # Page components
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Installation

### Backend Setup
```bash
cd server
npm install
```

### Frontend Setup
```bash
cd client
npm install
```

## Configuration

Create a `.env` file in the server directory:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Running the Application

### Start Backend
```bash
cd server
npm start
```

### Start Frontend
```bash
cd client
npm start
```

The application will run on:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Endpoints

- `GET /api/items` - Get all items
- `POST /api/items` - Create new item
- `GET /api/items/:id` - Get item by ID
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

## License

MIT
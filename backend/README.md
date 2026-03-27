# Astronomica - Node.js Express MongoDB API

A professional Node.js, Express, and MongoDB backend application with a well-organized folder structure.

## Project Structure

```
Astronomica/
├── src/
│   ├── config/           # Configuration files (database, constants)
│   ├── controllers/      # Business logic controllers
│   ├── models/          # Mongoose schemas and models
│   ├── routes/          # API route handlers
│   ├── middleware/      # Custom middleware (error handling, auth, etc.)
│   ├── utils/           # Utility functions (logger, helpers)
│   └── server.js        # Express server setup
├── logs/                # Application logs
├── .env.example         # Example environment variables
├── .gitignore          # Git ignore file
├── package.json        # Node.js dependencies and scripts
└── README.md           # This file
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or Atlas connection string)
- npm or yarn

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd Astronomica
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your MongoDB connection string:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/astronomica
   LOG_LEVEL=debug
   ```

## Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check if the API is running

### User Endpoints (Example)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## File Descriptions

| Folder/File | Purpose |
|---|---|
| `src/config/database.js` | MongoDB connection setup |
| `src/config/constants.js` | Application-wide constants |
| `src/middleware/errorHandler.js` | Global error handling middleware |
| `src/utils/logger.js` | Logging utility with file writing |
| `src/models/` | Mongoose models and schemas |
| `src/controllers/` | Business logic for routes |
| `src/routes/` | API endpoint definitions |
| `logs/` | Generated log files |

## Key Dependencies

- **Express** - Web framework
- **Mongoose** - MongoDB ODM
- **Dotenv** - Environment variable management
- **Cors** - Cross-Origin Resource Sharing
- **Helmet** - HTTP security headers
- **Express-validator** - Input validation (ready to use)
- **Nodemon** - Auto-reload during development

## Environment Variables

Create a `.env` file in the root directory with:
- `NODE_ENV` - Application environment (development/production)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `LOG_LEVEL` - Logging level (debug/info/warn/error)

## Next Steps

1. Update the user model and controller for your specific needs
2. Add authentication middleware
3. Create additional models and routes
4. Add input validation using express-validator
5. Implement tests using Jest or Mocha
6. Deploy to your hosting platform

## License

ISC

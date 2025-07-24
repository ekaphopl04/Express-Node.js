# Express.js Node.js Project

A basic Express.js application with RESTful API endpoints.

## Features

- Basic Express.js server setup
- JSON middleware for parsing requests
- Health check endpoint
- API endpoint with sample data
- Error handling middleware
- 404 route handler

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ekaphopl04/Express-Node.js.git
cd Express-Node.js
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on port 3000 (or the port specified in the PORT environment variable).

## API Endpoints

- `GET /` - Welcome message with available endpoints
- `GET /health` - Health check endpoint
- `GET /api` - Sample API endpoint

## Project Structure

```
Express-Node.js/
├── app.js          # Main application file
├── package.json    # Project dependencies and scripts
└── README.md       # Project documentation
```

## License

MIT

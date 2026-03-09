# QuickHire

QuickHire is a modern job board application built with the MERN stack.

## Installation & Setup

### 1. Prerequisites

- Node.js installed
- MongoDB

### 2. Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 3. Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update the API Client base URL for local development:
   Open `client/src/api/apiClient.js` and ensure the `baseURL` points to your local server instead of production:
   ```javascript
   baseURL: "http://localhost:5000/api",
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

# QuickHire - Simple Job Board Application

QuickHire is a mini job board application built with React (Vite) for the frontend and Node.js/Express for the backend. It allows users to browse job listings, search/filter jobs, and apply for positions.

## Project Structure

- `client/`: React frontend built with Vite and Tailwind CSS.
- `server/`: Node.js/Express backend with MongoDB/Mongoose.

## Setup Instructions

### Backend (Server)

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (one has been created for you) and set your `MONGODB_URI`.
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend (Client)

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Jobs

#### Get All Jobs
- **URL:** `/api/jobs`
- **Method:** `GET`
- **Query Parameters:**
  - `search`: Search by title or company
  - `category`: Filter by category (e.g., Design, Marketing)
  - `location`: Filter by location
- **Success Response:** `200 OK`

#### Get Single Job
- **URL:** `/api/jobs/:id`
- **Method:** `GET`
- **Success Response:** `200 OK`

#### Create Job (Admin)
- **URL:** `/api/jobs`
- **Method:** `POST`
- **Data Params:**
  ```json
  {
    "title": "Software Engineer",
    "company": "Tech Corp",
    "location": "San Francisco, CA",
    "category": "Technology",
    "description": "Job description here...",
    "type": "Full Time",
    "salary": "$100k - $120k",
    "logo": "URL to logo"
  }
  ```
- **Success Response:** `201 Created`

#### Delete Job (Admin)
- **URL:** `/api/jobs/:id`
- **Method:** `DELETE`
- **Success Response:** `200 OK`

### Applications

#### Submit Application
- **URL:** `/api/applications`
- **Method:** `POST`
- **Data Params:**
  ```json
  {
    "job_id": "JOB_OBJECT_ID",
    "name": "John Doe",
    "email": "john@example.com",
    "resume_link": "https://example.com/resume.pdf",
    "cover_note": "I am interested in this position."
  }
  ```
- **Success Response:** `201 Created`

#### Get Applications by Job ID (Internal)
- **URL:** `/api/applications/job/:jobId`
- **Method:** `GET`
- **Success Response:** `200 OK`

# Tech-Titans
Rubric Based Evaluation System
```
A full stack web application for reviewing student PDF submissions, assigning rubric based marks, and storing evaluation results. The system supports both manual marking and AI assisted evaluation.

Features

- Upload and preview student answer PDFs  
- Automatically extract text from PDFs  
- Generate rubric marks using the Groq API  
- Manually adjust marks before saving  
- Calculate question totals and final score  
- Save evaluation records in MongoDB  
- Review previously saved evaluations  

Rubric

The application uses a fixed rubric:

- Question 1 Concept: Maximum 3  
- Question 1 Formula: Maximum 2  
- Question 1 Calculation: Maximum 5  
- Question 2 Step 1: Maximum 2  
- Question 2 Step 2: Maximum 3  

Total: 15

Tech Stack

Frontend

- React 19  
- Vite  
- Axios  

Backend

- Node.js  
- Express  
- MongoDB and Mongoose  
- Multer for file uploads  
- pdf-parse for PDF text extraction  
- Groq SDK for AI evaluation  

Project Structure

rubric-marking-system/
├── backend/
│   ├── models/
│   │   └── Evaluation.js
│   ├── routes/
│   │   ├── evaluationRoutes.js
│   │   └── uploadRoutes.js
│   ├── uploads/
│   ├── aiEvaluator.js
│   ├── ocr.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
└── README.md

Prerequisites

- Node.js 18 or later  
- npm  
- MongoDB (local or Atlas)  
- Groq API key  

Environment Variables

Create a .env file inside backend:

PORT=5000  
MONGO_URI=mongodb://127.0.0.1:27017/rubric-marking-system  
GROQ_API_KEY=your_groq_api_key  

Replace MONGO_URI with your MongoDB Atlas string if needed.

Do not commit the .env file. Rotate credentials before sharing or deployment.

Installation

Backend setup

cd backend  
npm install  

Frontend setup

cd ../frontend  
npm install  

Running the Application

Start MongoDB if using locally.

Run backend

cd backend  
node server.js  

For auto restart

npx nodemon server.js  

Run frontend

cd frontend  
npm run dev  

Open the URL shown by Vite (usually http://localhost:5173)

Backend runs at http://localhost:5000

Usage

- Upload a student PDF  
- Enter student ID  
- Click Auto Evaluate or enter marks manually  
- Review and adjust rubric scores  
- Click Save to store in MongoDB  
- Click Review to view saved evaluations  
- Click Next or Clear to reset form  

API Endpoints

- GET / → check backend status  
- POST /api/upload → upload PDF (pdf field)  
- POST /auto-evaluate → extract and evaluate PDF (file field)  
- POST /api/evaluations/save → save evaluation  
- GET /api/evaluations → fetch all evaluations  
- GET /uploads/:filename → view uploaded file  

Production Notes

- Replace hardcoded backend URL with environment based config  
- Store uploads in cloud storage instead of local folder  
- Add authentication before handling real student data  
- Validate file types and request data  
- Avoid logging sensitive information  
- Add automated tests  

Frontend Scripts

From frontend directory:

npm run dev  
npm run build  
npm run lint  
npm run preview  
```

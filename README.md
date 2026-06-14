# Learning Management System (LMS)

A full-stack Learning Management System (LMS) developed using the MERN Stack (MongoDB, Express.js, React.js, Node.js). The platform provides a centralized environment for online learning, course management, student progress tracking, assessments, notifications, certificates, analytics, and payment processing.

---

## 🚀 Features

### 👨‍🎓 Student Module

* User Registration & Login
* JWT Authentication
* Browse Available Courses
* Course Enrollment
* Access Course Lessons
* Watch Lesson Videos
* Mark Lessons as Completed
* Take Quizzes
* Track Learning Progress
* Receive Notifications
* Submit Course Reviews
* Download Course Completion Certificates
* View Payment History

### 👨‍🏫 Instructor Module

* Instructor Dashboard
* Create Courses
* Edit Course Details
* Manage Own Courses
* Create Lessons
* Upload Lesson Videos (Cloudinary)
* Create Quizzes
* View Course Analytics

### 👨‍💼 Admin Module

* Admin Dashboard
* Platform Analytics
* User Statistics
* Course Statistics
* Enrollment Statistics
* Revenue Monitoring
* Generate Reports

### 💳 Payment Integration

* Razorpay Payment Gateway
* Course Purchase System
* Payment Verification
* Invoice Generation
* Payment History Tracking

### 📊 Analytics & Reporting

* Student Progress Analytics
* Course Analytics
* Platform Analytics
* Report Generation

### ☁️ Cloud Storage

* Cloudinary Video Upload
* Secure Media Management

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* jsPDF
* Vite

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt.js
* Multer

### Database

* MongoDB Atlas
* Mongoose

### Third-Party Services

* Cloudinary
* Razorpay

---

## 📁 Project Structure

```text
Learning-Management-System/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── routes/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/learning-management-system.git

cd learning-management-system
```

---

### 2. Backend Setup

Navigate to server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

Start backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

Navigate to client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api

VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

Start frontend:

```bash
npm run dev
```

---

## 🔑 Authentication

The system uses:

* JWT Authentication
* Protected Routes
* Role-Based Authorization

Roles:

* Student
* Instructor
* Admin

---

## 📦 API Modules

### Authentication

* Register
* Login
* Profile Management

### Courses

* Create Course
* Update Course
* Delete Course
* View Courses

### Lessons

* Create Lessons
* Upload Videos
* View Lessons

### Quizzes

* Create Quiz
* Attempt Quiz

### Progress

* Mark Lesson Completion
* Track Progress

### Certificates

* Generate Certificate
* Download PDF Certificate

### Reviews

* Submit Review
* View Reviews

### Notifications

* Course Notifications
* Lesson Updates

### Payments

* Create Razorpay Order
* Verify Payment
* Generate Invoice

### Reports

* Generate Reports
* View Analytics

---

## 🌐 Deployment

### Frontend

Deploy on:

* Vercel

### Backend

Deploy on:

* Railway

### Database

Use:

* MongoDB Atlas

### Media Storage

Use:

* Cloudinary

---

## 📸 Major Functionalities

* User Authentication
* Course Management
* Lesson Management
* Video Upload System
* Quiz System
* Progress Tracking
* Notification System
* Review System
* Certificate Generation
* Analytics Dashboard
* Admin Reporting
* Razorpay Payment Integration

---

## 🔒 Security Features

* Password Hashing using bcrypt
* JWT Authentication
* Protected API Routes
* Role-Based Access Control
* Environment Variable Protection

---

## 👨‍💻 Author

**Dev Patel**

B.Tech Computer Science Engineering

Learning Management System (LMS) – MERN Stack Project

---

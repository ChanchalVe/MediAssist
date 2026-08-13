# Curaivo 💊

> A full-stack medication management system that helps users stay on top of their prescriptions, schedules, and health routines — so missed doses become a thing of the past.

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## About

Curaivo is a healthcare web application built to simplify medication management for individuals. It provides a secure, centralized platform where users can register their medications, set up schedules, and receive automated reminders — reducing human error and improving treatment adherence.

---

## Features

- 🔐 **User Authentication** — Secure sign-up and login with JWT-based sessions and bcrypt password hashing
- 💊 **Medication Management** — Add, edit, and delete medications with dosage and frequency details
- 🗓️ **Scheduling** — Set custom medication schedules and timing plans
- 🔔 **Automated Reminders** — Get notified before upcoming doses automatically
- 📋 **Prescription Tracking** — Maintain a history of prescriptions and past medication records
- 📊 **Dashboard** — View all active medication plans at a glance in one clean interface
- 🗄️ **Centralized Records** — All medication data stored securely in one place

---

## Tech Stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| Frontend       | React.js, HTML5, CSS3, JavaScript |
| Backend        | Node.js, Express.js               |
| Database       | MongoDB                           |
| Authentication | JWT, bcrypt                       |
| Notifications  | Automated reminder system         |

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/Curaivo .git
   cd Curaivo
   ```

2. **Install backend dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the `server/` directory:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

### Running the App

1. **Start the backend server**

   ```bash
   cd server
   npm start
   ```

2. **Start the frontend**

   ```bash
   cd client
   npm start
   ```

3. Open your browser and go to `http://localhost:3000`

---

## Usage

1. **Register** a new account or **log in** with existing credentials
2. Navigate to the **Dashboard** to view your current medication plans
3. Click **Add Medication** to enter a new medicine, dosage, and schedule
4. Set your preferred **reminder times** for each medication
5. Receive **automated notifications** before each dose is due
6. Track your **medication history** and manage prescriptions from one place

---

## Project Structure

```
Curaivo /
├── client/               # React frontend
│   ├── public/
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Page-level components
│       ├── services/     # API call functions
│       └── App.js
│
├── server/               # Node.js + Express backend
│   ├── controllers/      # Route handler logic
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API route definitions
│   ├── middleware/        # Auth middleware
│   └── server.js
│
└── README.md
```

---

## Future Enhancements

- 👨‍⚕️ Doctor-Patient Integration
- 📱 Mobile Application (React Native)
- 🤖 AI-based Medication Recommendations
- 📧 Email and SMS Notifications
- 📈 Health Analytics Dashboard
- 📷 Prescription Scanning via OCR

---

## 👩‍💻 Author

**Chanchal Verma**

Developed to simplify medication management and improve healthcare accessibility through intelligent automation.

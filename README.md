# Employee Attendance System

A full-stack Employee Attendance System built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

### Employee
- **Register/Login**: Secure authentication with role-based access.
- **Dashboard**: View today's status, recent activity, and stats.
- **Mark Attendance**: Quick Check In/Check Out.
- **History**: View detailed attendance history.
- **Profile**: View profile details (Department, Employee ID).
- **Late Arrival Logic**: Automatically marks status as "Late" if checked in after 9:00 AM.

### Manager
- **Dashboard**: View team stats (Present, Absent, Late).
- **All Employees**: View attendance records of all employees.
- **Reports**: Export attendance reports to CSV.

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS, Zustand, Lucide React.
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT.

## Setup Instructions

### Prerequisites
- Node.js installed.
- MongoDB installed and running locally (or update `.env` with cloud URI).

### 1. Clone the repository
```bash
git clone <repository-url>
cd tap
```

### 2. Backend Setup
```bash
cd server
npm install
# Create .env file (see Environment Variables below)
npm run seed # Optional: Seed sample data (Manager: manager@example.com / password123)
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

### 4. Access the App
Open [http://localhost:5173](http://localhost:5173) in your browser.

## Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env

### Employee Profile
![Employee Profile](screenshots/profile_page.png)

### Manager Dashboard (All Employees)
![Manager Dashboard](screenshots/manager_dashboard.png)

# Employee Attendance System

A full-stack Employee Attendance System built with the MERN stack (MongoDB, Express, React, Node.js). Designed to streamline workforce management with role-based access for Employees and Managers.

**Developed By:**
-Govindhasamy K
-Indra Ganesan College of Engineering, Tiruchirappalli
-Contact: 8681058703

---

## 🚀 Features

### 👨‍💼 Employee
- **Secure Authentication**: Register and Login with secure JWT authentication.
- **Dashboard**: Real-time view of today's status, check-in/out times, and recent activity.
- **Mark Attendance**: One-click Check In and Check Out functionality.
- **Late Marking**: Automatically flags attendance as "Late" if checked in after 9:00 AM.
- **Attendance History**: View a comprehensive history of past attendance records.
- **Profile**: View personal details (Department, Employee ID).

### 👩‍💼 Manager
- **Team Dashboard**: Overview of the entire team's status (Present, Absent, Late).
- **Employee Monitoring**: View attendance records for all employees.
- **Reports**: Export attendance data to CSV for payroll and analysis.
- **Calendar View**: Visual representation of team attendance.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, TailwindCSS, Zustand (State Management), Lucide React (Icons).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Atlas), Mongoose.
- **Authentication**: JSON Web Tokens (JWT), Bcrypt.js.
- **Deployment**: Vercel (Frontend), Render (Backend), MongoDB Atlas (DB).

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas Connection String)

### 1. Clone the Repository
```bash
git clone https://github.com/kggopi-16/employee_attendence_system.git
cd employee_attendence_system
```

### 2. Backend Setup
```bash
cd server
npm install
```

**Configure Environment Variables:**
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee-attendance
JWT_SECRET=your_super_secret_key_change_this_in_production
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**Run the Server:**
```bash
npm run seed # (Optional) Seeds the DB with a Manager & Employee
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
```

**Configure Environment Variables:**
Create a `.env` file in the `client` directory (optional for local, required if API is on a different port):
```env
VITE_API_URL=http://localhost:5000/api
```

**Run the Client:**
```bash
npm run dev
```

### 4. Access the App
Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🌍 Deployment

This project is configured for easy deployment.

- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

## 📸 Screenshots

### Employee Profile
![Employee Profile](screenshots/profile_page.png)

### Manager Dashboard
![Manager Dashboard](screenshots/manager_dashboard.png)

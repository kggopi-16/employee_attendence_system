# Production Deployment Guide

This guide details the exact configuration required for your Employee Attendance System to run on **Vercel (Frontend)**, **Render (Backend)**, and **MongoDB Atlas (Database)**.

## 1. Codebase Verification (Completed)
Your code is already configured correctly:
- **Backend (`server/index.js`)**: Configured to accept requests from your Vercel app and localhost.
- **Frontend (`client/src/api/axios.js`)**: Configured to point to your Render API (`VITE_API_URL`) or fallback to localhost.
- **Routing (`client/vercel.json`)**: Configured for SPA routing.
- **Start Script (`server/package.json`)**: Set to `node index.js`.

## 2. MongoDB Atlas (Database)
Ensure your database has the correct data.
- **Connection String**: `mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/employee-attendance`
- **Network Access**: Ensure IP Access List includes `0.0.0.0/0` (Allow Access from Anywhere) so Render can connect.
- **Data**: You have already seeded the database.
    - **Manager**: `manager@example.com` / `password123`

## 3. Render (Backend)
Go to your **Render Dashboard** > **Web Service** > **Environment** and ensure these variables are set:

| Variable | Value |
| :--- | :--- |
| `NODE_ENV` | `production` |
| `MONGODB_URI` | *(Your Atlas Connection String)* |
| `JWT_SECRET` | *(Your Secret Key)* |
| `CLIENT_URL` | `https://employee-attendance-system.vercel.app` (No trailing slash) |

**Settings Check:**
- **Build Command**: `npm install`
- **Start Command**: `node index.js`
- **Root Directory**: `server`

## 4. Vercel (Frontend)
Go to your **Vercel Dashboard** > **Project** > **Settings** > **Environment Variables** and ensure this variable is set:

| Variable | Value |
| :--- | :--- |
| `VITE_API_URL` | `https://employee-attendance-system.onrender.com/api` (Must include `/api`) |

**Redeploy**:
After adding the variable, you must **Redeploy** for it to take effect:
1.  Go to **Deployments**.
2.  Click the three dots on the latest deployment.
3.  Select **Redeploy**.

## 5. Final Verification
1.  Open your Vercel URL.
2.  Login as Manager (`manager@example.com`).
3.  If it loads, you are done!

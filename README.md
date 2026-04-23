# Pro Green Life Voucher Redemption System

A professional, production-ready full-stack web application for **Pro Green Life**. This platform allows customers to redeem physical vouchers for eco-friendly rewards and provides a secure admin dashboard for managing claims.

## 🚀 Features

- **Professional UI:** Eco-friendly, modern corporate design with a green/white theme.
- **Voucher Validation:** Secure validation of unique codes.
- **Reward Selection:** Interactive selection of available rewards.
- **Claim Management:** Admin dashboard to track, search, and update claim statuses.
- **Security:** JWT-based admin authentication and password hashing.
- **Export/Import:** CSV export for claims data.
- **Responsive:** Mobile and desktop friendly.

## 🛠️ Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Notifications:** React Hot Toast

## 📦 Project Structure

```
├── client/          # Frontend React application
├── server/          # Backend Express API
├── package.json    # Root configuration for monorepo scripts
└── README.md
```

## 🛠️ Local Setup

### 1. Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

### 2. Environment Configuration

#### Server (`/server/.env`)
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

#### Client (`/client/.env`)
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Installation
```bash
# Install root dependencies
npm install

# Install client and server dependencies
npm run install-all
```

### 4. Seed Data
Initialize the database with a default admin account, rewards, and sample vouchers:
```bash
npm run seed
```

### 5. Running the Application
```bash
# Run both client and server concurrently
npm run dev
```

## 🔐 Admin Credentials (Demo)

> [!IMPORTANT]
> **Username:** `admin`  
> **Password:** `ProGreenLife@2026`  
> **Note:** Please change this password immediately in production.

## 🚀 Deployment Instructions

### Repository Setup
```bash
git init
git remote add origin https://github.com/Tranvanthuan1805/progreenlife.vercel.app.git
git add .
git commit -m "Initial Pro Green Life voucher redemption website"
git branch -M main
git push -u origin main
```

### Vercel Deployment

#### 1. Frontend (Vercel)
1. Connect your GitHub repository to Vercel.
2. Set the **Root Directory** to `client`.
3. Framework Preset: **Vite**.
4. Set Environment Variables: `VITE_API_URL` (points to your deployed backend).

#### 2. Backend (Vercel Serverless)
1. The project is structured to support Vercel serverless functions.
2. Ensure `MONGODB_URI` and `JWT_SECRET` are set in Vercel project settings.
3. If deploying separately (e.g., Render, Heroku), ensure the `client/dist` is served correctly or handle CORS.

---

Designed with ❤️ for Pro Green Life.

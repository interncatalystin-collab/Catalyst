# InternCatalyst (Edu2Work) - Production Deployment Guide

This guide covers how to deploy **InternCatalyst** to production. The project is designed with a unified architecture: the backend Node.js server can serve both the REST API endpoints (`/api/*`) and the compiled React production frontend (`dist/`) on a single port.

---

## 📋 Environment Variables Reference

When deploying to any cloud provider, set the following environment variables in your platform's Environment / Secrets panel:

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server listening port | `5000` (or injected by host like `$PORT`) |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/interncatalyst?retryWrites=true&w=majority` |
| `JWT_SECRET` | Secret key for JWT tokens | `generate_a_secure_random_string_here` |
| `CLIENT_URL` | Allowed client URL for CORS | `*` (or `https://your-domain.com`) |
| `EMAIL_HOST` | SMTP server host | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP server port | `587` |
| `EMAIL_SECURE` | SSL connection flag | `false` |
| `EMAIL_USER` | Sender email address | `your-email@gmail.com` |
| `EMAIL_PASS` | Google 16-character App Password | `abcd efgh ijkl mnop` |
| `EMAIL_FROM` | Outgoing email display name | `InternCatalyst <no-reply@interncatalyst.org>` |
| `ADMIN1_PASSWORD` | Initial admin seed password | `AdminSecurePass1` |

> [!NOTE]
> **MongoDB Atlas IP Access**: Ensure you whitelist **`0.0.0.0/0`** (Allow access from anywhere) in MongoDB Atlas under **Network Access** so your cloud hosting provider can connect to your database.

---

## 🚀 Option 1: Render (Recommended - Single Full-Stack Web Service)

Render allows you to host the entire application (React frontend + Node backend + MongoDB connection) as a single Web Service.

1. Push your code to your GitHub repository:
   ```bash
   git add .
   git commit -m "Production deployment ready"
   git push -u origin main
   ```
2. Log in to [Render.com](https://render.com) and click **New +** → **Web Service**.
3. Select your GitHub repository (`Catalyst` or `Edu2Work`).
4. Configure the service settings:
   - **Name:** `interncatalyst` (or your preferred name)
   - **Region:** Closest to your users (e.g., Singapore, Frankfurt, Oregon)
   - **Branch:** `main`
   - **Runtime:** `Node`
   - **Build Command:**
     ```bash
     npm install && npm run build
     ```
   - **Start Command:**
     ```bash
     npm start
     ```
5. Click **Advanced** → **Add Environment Variable** and add the variables from the table above (`MONGODB_URI`, `JWT_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, etc.).
6. Click **Create Web Service**.
7. Render will build Vite into `dist/`, start the server, connect to MongoDB, and provide you with a live `https://your-app.onrender.com` URL!

---

## 🚂 Option 2: Railway

1. Go to [Railway.app](https://railway.app) and click **New Project** → **Deploy from GitHub repo**.
2. Select your repository.
3. In Railway **Settings**:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
4. Under **Variables**, add:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `NODE_ENV=production`
5. Click **Deploy**. Railway will generate an SSL domain for your app.

---

## ⚡ Option 3: Split Deployment (Vercel Frontend + Render Backend)

If you prefer deploying the React frontend on Vercel and the backend on Render:

### Backend (on Render)
- Build Command: `npm install`
- Start Command: `npm run backend`
- Add environment variables (`MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL=https://your-frontend.vercel.app`, etc.)

### Frontend (on Vercel)
1. Import repository into [Vercel](https://vercel.com).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. In `vite.config.js` or `.env.production` on Vercel:
   - Set backend API destination to your Render backend URL.

---

## 🧪 Post-Deployment Checklist

After your site is live:
1. **Visit the URL:** Check that the homepage loads with verified badge and navigation.
2. **Test Student Registration:** Register a new student account and verify that the welcome confirmation email is received.
3. **Test Internship Application:** Log in as a student, apply for an internship with the ₹100 fee simulator, and verify that the application confirmation email is delivered.
4. **Check Mobile Display:** Open the website on a mobile phone to confirm the responsive drawer, tables, and modal actions operate smoothly.

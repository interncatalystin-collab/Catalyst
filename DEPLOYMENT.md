# InternCatalyst (Edu2Work) - Production Deployment Guide

This guide covers how to deploy **InternCatalyst** to production. The project is designed with a unified full-stack architecture that can be deployed as a single project on **Vercel** (Vite React frontend + Serverless Node.js API), or as a persistent web service on **Render** or **Railway**.

---

## 📋 Environment Variables Reference

When deploying to Vercel or any cloud provider, set the following environment variables in your platform's **Environment Variables** panel:

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `NODE_ENV` | Environment mode | `production` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/interncatalyst?retryWrites=true&w=majority` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secure_random_jwt_secret_key` |
| `CLIENT_URL` | Allowed client URL for CORS | `*` (or `https://your-project.vercel.app`) |
| `EMAIL_HOST` | SMTP server host | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP server port | `587` |
| `EMAIL_SECURE` | SSL connection flag | `false` |
| `EMAIL_USER` | Sender email address | `your-email@gmail.com` |
| `EMAIL_PASS` | Google 16-character App Password | `abcd efgh ijkl mnop` |
| `EMAIL_FROM` | Outgoing email display name | `InternCatalyst <no-reply@interncatalyst.org>` |
| `ADMIN1_PASSWORD` | Initial admin seed password | `Admin1@Catalyst2026` |
| `ADMIN2_PASSWORD` | Admin 2 seed password | `Admin2@Catalyst2026` |
| `ADMIN3_PASSWORD` | Admin 3 seed password | `Admin3@Catalyst2026` |
| `ADMIN4_PASSWORD` | Admin 4 seed password | `Admin4@Catalyst2026` |
| `ADMIN5_PASSWORD` | Admin 5 seed password | `Admin5@Catalyst2026` |

> [!IMPORTANT]
> **MongoDB Atlas IP Whitelist (`0.0.0.0/0`)**:
> Since Vercel executes serverless functions on dynamic IP addresses, you **must** whitelist all IPs in MongoDB Atlas:
> 1. Go to [MongoDB Atlas](https://cloud.mongodb.com).
> 2. In the left sidebar under **Security**, click **Network Access**.
> 3. Click **Add IP Address** -> select **Allow Access from Anywhere** (`0.0.0.0/0`).
> 4. Click **Confirm**.

---

## ⚡ Option 1: Vercel (Recommended - Full-Stack Single Deployment)

InternCatalyst includes native Vercel configuration (`vercel.json` + `api/index.js` + `api/[...slug].js`). Both the React 19 frontend and the Node.js REST API run seamlessly under a single domain with automatic SSL and zero-config CI/CD.

### Method A: Deploy via GitHub (Easiest)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Configure Vercel serverless deployment"
   git push origin main
   ```
2. **Import repository to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/new).
   - Sign in with GitHub and select your **Catalyst** / **InternCatalyst** repository.
   - Framework Preset will auto-detect as **Vite**.
   - Root Directory: `./` (leave default).
3. **Configure Build & Output**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. **Add Environment Variables**:
   Expand the **Environment Variables** section and add:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB Atlas connection URI
   - `JWT_SECRET`: A secure random secret string
   - `EMAIL_HOST`: `smtp.gmail.com`
   - `EMAIL_PORT`: `587`
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your 16-character Google App Password
   - `EMAIL_FROM`: `InternCatalyst <no-reply@interncatalyst.org>`
   - `ADMIN1_PASSWORD`: `AdminSecurePass1`
5. **Click Deploy**:
   Vercel will build the frontend into `dist/`, link the `/api/*` serverless functions, and generate your live production URL (e.g. `https://interncatalyst.vercel.app`)!

---

### Method B: Deploy via Vercel CLI

If you prefer deploying directly from your terminal:

1. **Install Vercel CLI globally** (or use `npx`):
   ```bash
   npm i -g vercel
   ```
2. **Log in to Vercel**:
   ```bash
   vercel login
   ```
3. **Deploy to Preview**:
   ```bash
   vercel
   ```
   Follow the interactive prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your personal or team account
   - Link to existing project? **N**
   - Project name? `interncatalyst` (or press Enter)
   - In which directory is code located? `./`
4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

## 🚀 Option 2: Render (Persistent Web Service Alternative)

Render allows you to host the entire application as a single persistent Web Service:

1. Log in to [Render.com](https://render.com) and click **New +** → **Web Service**.
2. Select your GitHub repository.
3. Configure the service settings:
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
4. Under **Environment Variables**, add the variables from the table above (`MONGODB_URI`, `JWT_SECRET`, etc.).
5. Click **Create Web Service**.

---

## 🚂 Option 3: Railway

1. Go to [Railway.app](https://railway.app) and click **New Project** → **Deploy from GitHub repo**.
2. Select your repository.
3. In Railway **Settings**:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
4. Under **Variables**, add the variables (`MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`, etc.).
5. Click **Deploy**.

---

## 🧪 Post-Deployment Checklist

After your site is live on Vercel:
1. **Health Check:** Open `https://your-project.vercel.app/api/health` in your browser to verify the backend serverless API responds with `{"status":"ok"}`.
2. **Visit Homepage:** Confirm the responsive landing page, verified badge, and navigation links load quickly from Vercel's global CDN.
3. **Test Student Registration:** Register a new student account and confirm that the welcome email is delivered.
4. **Test Admin Login:** Go to `/login`, switch to Admin mode, log in with `admin-1` and your configured `ADMIN1_PASSWORD`, and verify dashboard statistics and student export to Excel.
5. **Test Page Refresh (SPA Routing):** Refresh any subpage (like `/login` or `/admin`) to verify `vercel.json` rewrites prevent 404 errors.

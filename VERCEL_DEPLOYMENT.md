# Deploying VR Painting Solutions to Vercel

This project is fully configured and tested for one-click deployment on **Vercel**.

---

## What was configured for Vercel Compatibility

1. **Serverless Next.js API Routes (`frontend/app/api/`)**:
   - `/api/leads`: Direct WhatsApp URL generation + optional Resend email dispatch.
   - `/api/gallery`: Returns categorized portfolio items (all 65 projects).
   - `/api/services`: Returns painting services list.
   - `/api/health`: Health status endpoint.
   *(No separate backend server or external database required on Vercel)*

2. **Unified Build Scripts & Monorepo Configuration**:
   - `package.json` in the project root routes builds directly:
     ```json
     "build": "npm --prefix frontend run build"
     ```
   - `vercel.json` in root configured with:
     ```json
     {
       "buildCommand": "cd frontend && npm run build",
       "outputDirectory": "frontend/.next",
       "framework": "nextjs"
     }
     ```

3. **Dynamic API Routing**:
   - Production calls use relative same-origin routes (`/api/...`), seamlessly served by Next.js Serverless Functions on Vercel.

---

## Method 1: Deploy via GitHub (Recommended)

1. Open PowerShell / Command Prompt in `VR Paintings Solution`:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for VR Painting Solutions"
   ```
2. Create a new GitHub repository and push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/vr-paintings-solution.git
   git branch -M main
   git push -u origin main
   ```
3. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
4. **Configuration on Vercel Import screen**:
   - **Framework Preset**: Next.js
   - **Root Directory**: Select `frontend` (or leave default `./` — both work with our configuration)
   - Click **Deploy**!

---

## Method 2: Deploy via Vercel CLI (Instant)

1. In PowerShell, run:
   ```bash
   npx vercel
   ```
2. Follow the interactive prompts:
   - *Set up and deploy?* -> `y`
   - *Which scope?* -> Select your Vercel account
   - *Link to existing project?* -> `n`
   - *Project name?* -> `vr-paintings-solution`
   - *In which directory is your code located?* -> `frontend` (or `./`)
   - *Want to modify settings?* -> `n`
3. To deploy to production:
   ```bash
   npx vercel --prod
   ```

---

## Optional Environment Variables (in Vercel Project Settings)

Add these under **Settings > Environment Variables** on Vercel if you wish to customize:

| Variable | Value | Description |
| :--- | :--- | :--- |
| `WHATSAPP_PHONE` | `919284825543` | Business WhatsApp number for receiving leads |
| `NOTIFICATION_EMAIL` | `vrpainting117@gmail.com` | Email address where form inquiries arrive |
| `RESEND_API_KEY` | *(optional)* | Resend API key for automated lead alert emails |

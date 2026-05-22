# Sutra Lock - Deployment Guide

## Hosting

The app is deployed on **Vercel**, which provides seamless integration with Next.js.

## Prerequisites

- A [Vercel](https://vercel.com) account (free tier is sufficient)
- The repository pushed to GitHub

## Deployment Steps

### 1. Connect Repository

1. Log in to Vercel
2. Click "Add New Project"
3. Import the `sutra-lock` repository from GitHub
4. Vercel auto-detects the Next.js framework

### 2. Configure Build Settings

Vercel's defaults should work out of the box:

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Build Command | `next build` |
| Output Directory | `.next` |
| Install Command | `npm install` |

No environment variables are required for v1.

### 3. Deploy

Click "Deploy". Vercel builds and deploys automatically.

### 4. Verify PWA

After deployment:

1. Open the production URL on an Android device
2. Chrome should show the "Add to Home Screen" banner
3. Install and verify the app launches in standalone mode
4. Test the full flow: pledge → speech recognition → timer

## Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions

## HTTPS Requirement

The Web Speech API and Service Workers **require HTTPS**. Vercel provides HTTPS by default on all deployments, including preview URLs.

## Continuous Deployment

Every push to the `main` branch triggers a new production deployment automatically. Pull requests generate preview deployments.

## Troubleshooting

| Issue | Solution |
|-------|---------|
| PWA not installable | Verify `manifest.json` is accessible at `/manifest.json` |
| Speech API not working | Ensure the site is served over HTTPS |
| Service Worker not updating | Hard refresh or clear browser cache |
| Build fails | Check `npm run build` locally first |

# One-Click Deployment Guide (Vercel Only)

This project is now optimized for **Vercel-only deployment**. Your frontend and backend (scraper) will live in the same project.

## 1. Quick Deploy to Vercel

### Steps:
1.  **Import to Vercel**: 
    *   Connect your GitHub repository to Vercel.
2.  **Configure Environment Variables**:
    *   In the Vercel dashboard, go to **Settings** > **Environment Variables**.
    *   Add: `GEMINI_API_KEY` = (Your Google Gemini Key).
3.  **Build Settings**:
    *   Vercel will automatically detect the `api/` folder and create your endpoints.
    *   The build command is `npm run build`.
    *   The output directory is `dist`.
4.  **Deploy**:
    *   Click **Deploy**. Your UI and Scraper will be live on a single URL.

## 2. Why this is better?
*   **Zero Cost**: Runs entirely on the Vercel Free Tier.
*   **No Docker**: No need to manage containers or Render servers.
*   **Single URL**: Your frontend and backend share the same domain, preventing CORS issues.

## 3. Local Development
*   Run `npm run dev` to start both the UI and the local serverless functions.
*   The project uses `@sparticuz/chromium-min` which handles the browser automatically in production.

## 4. Performance Note
*   **Vercel Hobby Plan**: Serverless functions have a 10s execution limit. If the website you are scraping is extremely slow, it might timeout. For most websites, it works perfectly.

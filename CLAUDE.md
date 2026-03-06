# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MogMaxx is a landing page and web app for an iOS body transformation visualization app.

## Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # TypeScript check + Vite production build
npm run preview  # Preview production build locally
```

No test framework is configured.

## Architecture

- **Stack:** React 18, TypeScript, Vite, Tailwind CSS 3, react-router-dom v6
- **Routing:** `src/main.tsx` defines all routes — `/` (Landing), `/creator` (CreatorTools), `/creator/clean-ratings-template`, `/creator/ratings-template`, `/creator/example-content`, `/support`, `/privacy`
- **Pages:** `src/pages/` — each page is a self-contained route component
- **Components:** `src/components/` — shared components like `ImageUploader` (drag/zoom image widget) and `RatingCard`
- **Utilities:** `src/utils/ratings.ts` — rating calculation helpers
- **Key dependency:** `html-to-image` for exporting template pages as images

## Deployment

- Hosted on Vercel (`.vercel` is gitignored)
- `vercel.json` has a catch-all rewrite (`/(.*) → /index.html`) for SPA routing — no updates needed when adding new routes

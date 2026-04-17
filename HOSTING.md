# Hosting (Free)

This site is static (HTML/CSS/JS), so you can host it for free with no build step.

## Option A (Recommended): GitHub Pages

This repository is already configured to deploy to GitHub Pages automatically via GitHub Actions.

1. Initialize git (run in this folder):
   - `git init`
   - `git add .`
   - `git commit -m "Initial site"`
2. Create a new repo on GitHub (no README/license needed).
3. Add the remote + push:
   - `git remote add origin <YOUR_REPO_URL>`
   - `git branch -M main`
   - `git push -u origin main`
4. The workflow in `.github/workflows/pages.yml` will deploy the site from the repo root.
5. Your site will be available at `https://<username>.github.io/<repo>/`

## Option B: Netlify (Drag & Drop)

1. Go to Netlify → **Add new site** → **Deploy manually**
2. Drag this entire folder (or a zip of it) into the drop area
3. Netlify will give you a free `*.netlify.app` URL

## Option C: Cloudflare Pages (Git-connected)

1. Create a GitHub repo and push (same as GitHub Pages steps 1–3)
2. In Cloudflare Pages: **Create a project** → connect the repo
3. Build settings: **no build command**, output directory: **/** (root)


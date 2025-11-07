# site5 — BePay single-page site (EN / RU / KA)

This folder contains a modern single-page site scaffold derived from site3/assets/ProcessingBePay.pptx.

Files added:
- index.html
- css/style.css
- js/main.js
- assets/i18n/en.json, ru.json, ka.json

Assets (logo, pptx, pdf) are expected to be in site5/assets/ (you mentioned you copied them).

Preview locally:
1. From repo root: npx serve site5
2. Or: cd site5 && python -m http.server 8000

Deploy to GitHub Pages:
1. Push these files to the `main` branch (already done in this commit).
2. In repo Settings → Pages select Branch: `main` and folder `/site5` (or set GitHub Pages to serve the root if you move index.html to repo root).

Notes and next steps:
- I used the ProcessingBePay.pptx as the content source and created translations for English, Russian and Georgian.
- If you want fully optimized generated hero video/images, I can produce lightweight web versions and commit them to site5/assets.
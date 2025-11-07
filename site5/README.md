# site5 — BePay single-page site (EN / RU / KA)

This folder contains the polished single-page site derived from site3/assets/ProcessingBePay.pptx. The site now includes:

- Mailto-based contact (opens user's email client) and a thank-you page
- Chat widget that opens WhatsApp and simulates live chat on the page
- Optimized SVG visual placeholders for hero and case study images (slide1..slide4)
- Expanded i18n content (English / Russian / Georgian) taken from the presentation slides

Local preview:
- cd site5 && python -m http.server 8000

Deploy to Netlify (optional):
- Connect repo -> Build settings: Branch: main, Publish directory: site5
- Netlify will automatically pick up forms if the HTML form has data-netlify="true"

Notes and next steps:
- I generated many SVG placeholders for visuals. If you want pixel-perfect raster images (PNG/WebP) extracted from the PPTX slides, I can extract and convert them and push as well — give me the go-ahead.
- I can also generate an 8-12s hero MP4/WebM loop from the slides to be used as a background; this will improve the visual feel.

Testing checklist:
- Run site locally: cd site5 && python -m http.server 8000
- Open http://localhost:8000 and verify hero image and case study images appear.
- Test the contact form — it will open the mail client (mailto) addressed to info@bepay.ge.

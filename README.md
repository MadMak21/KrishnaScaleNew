# Krishna Scale Website

Static multilingual business website for Krishna Scale, Savarkundla, Gujarat.

## Files

- `index.html` - site shell, SEO tags, structured data and Google Analytics loader.
- `styles.css` - responsive industrial-modern design.
- `script.js` - Gujarati/Hindi/English content, product catalogue, page routing, WhatsApp links and AI-style chat widget.
- `assets/products/` - copied product photos.
- `robots.txt` and `sitemap.xml` - basic SEO publishing files.
- `local-preview-server.cjs` / `local-preview-server.ps1` - optional local preview helpers.

## Preview

Open `index.html` directly in a browser, or run a simple static server from this folder. In this Codex session the preview is running at:

`http://127.0.0.1:5173/`

## Before Going Live

1. Replace `G-XXXXXXXXXX` in `index.html` with the real Google Analytics measurement ID.
2. Replace the GST placeholder in `script.js` if you want the GST number shown publicly.
3. Replace the establishment label in `script.js` if you want an exact `Est. YEAR` badge.

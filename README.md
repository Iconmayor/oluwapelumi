# Oluwapelumi — A little lovely. A lot remarkable.

An original, responsive personal-portfolio and tribute website. Built from scratch using semantic HTML, CSS, and vanilla JavaScript (no Lovable, no npm packages, no framework build required).

## Preview locally

From this directory:

```bash
python3 -m http.server 8080
```

Open http://localhost:8080 in a browser.

## Deploy to Vercel via GitHub

1. Create a **new private GitHub repository** (for example, `oluwapelumi-site`).
2. Upload all the files **and the complete `assets/` directory** to the repository root; don't upload only the ZIP itself.
3. In Vercel choose **Add New > Project > Import Git Repository** and select the repository.
4. Select **Framework Preset: Other**; leave Build Command blank, Output Directory blank, and Root Directory `./`.
5. Click **Deploy**. Subsequent pushes to your connected default branch deploy automatically.
6. Check the preview with the subject before sharing or publishing widely.

This static site requires no environment variables or backend service and works on Vercel's static hosting.

## Editing

- `index.html` — all headings, about text, card content, gallery captions, linked profile, and your note.
- `styles.css` — layout, colors, fonts, responsive behavior and animation.
- `script.js` — mobile menu, tab switching, gallery lightbox and scroll reveal.
- `assets/photos` — optimized copies of the 12 user-supplied images. Don't redistribute without the subject's permission.
- `assets/favicon.svg` — original flower-shaped favicon.

### Design palette
- Ivory background `#fbf6f2`
- Deep plum `#45283e`
- Dusty rose `#df7890`
- Blush `#f4d9dc`
- Lavender `#e7d9f1`
- Warm cream `#fbefd9`

## Important pre-publication checklist

- Confirm that **Oluwapelumi** is the name/spelling she wants displayed and that she consents to the publication of these photos.
- The supplied LinkedIn URL is linked, but LinkedIn did not expose the complete profile for a verified list of specialties. Replace the intentionally general role/focus copy with her actual services and confirmed professional experience.
- Review and personalize the appreciative note; it was drafted from your description, not quoted from her or you.
- This initial preview sets `<meta name="robots" content="noindex,nofollow">` and `robots.txt` disallows crawling to reduce accidental indexing before approval. Remove these restrictions when publishing the approved site.
- Confirm she is happy to be publicly labelled a co-founder and growth partner.
- Run a final mobile/browser check after Vercel deployment.

## Features

- Desktop/mobile responsive design
- Accessible navigation and gallery lightbox (click thumbnails, arrow-key navigation, Escape to close)
- Reduced-motion support for animations
- Real optimized `.webp` photographs with descriptive alt text and lazy loading
- Interactive 'many sides' section, no external JavaScript dependencies
- Original floral favicon, SEO/social metadata placeholders, and basic security headers
- One-click LinkedIn contact and subtle Able Digital development credit
